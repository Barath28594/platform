require("dotenv").config();

const { Octokit } = require("@octokit/rest");
const sodium = require("libsodium-wrappers");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createRepository(application) {
  const repoName = `${application.applicationName}-infra`
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-");

  const response = await octokit.repos.createForAuthenticatedUser({
    name: repoName,
    private: false,
    auto_init: false,
    description: `Infrastructure repository for ${application.applicationName}`,
  });

  return {
    name: response.data.name,
    htmlUrl: response.data.html_url,
    defaultBranch: response.data.default_branch,
  };
}

async function uploadRepositoryFiles(repoName, files) {
  for (const [path, content] of Object.entries(files)) {
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: repoName,
      path,
      message: `Add ${path}`,
      content: Buffer.from(content).toString("base64"),
    });
  }
}

async function setRepositoryVariable(repoName, name, value) {
  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/variables",
    {
      owner: process.env.GITHUB_OWNER,
      repo: repoName,
      name,
      value,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

async function setRepositorySecret(repoName, name, value) {
  await sodium.ready;

  const publicKeyResponse = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/secrets/public-key",
    {
      owner: process.env.GITHUB_OWNER,
      repo: repoName,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const publicKey = publicKeyResponse.data.key;
  const keyId = publicKeyResponse.data.key_id;

  const encryptedBytes = sodium.crypto_box_seal(
    Buffer.from(value),
    sodium.from_base64(
      publicKey,
      sodium.base64_variants.ORIGINAL
    )
  );

  const encryptedValue = sodium.to_base64(
    encryptedBytes,
    sodium.base64_variants.ORIGINAL
  );

  await octokit.request(
    "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
    {
      owner: process.env.GITHUB_OWNER,
      repo: repoName,
      secret_name: name,
      encrypted_value: encryptedValue,
      key_id: keyId,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

async function createProductionEnvironment(repoName) {

    console.log(`Creating production environment for ${repoName}...`);

    // Get the authenticated GitHub user
    const userResponse = await octokit.request(
        "GET /user",
        {
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );

    const reviewerId = userResponse.data.id;

    await octokit.request(
        "PUT /repos/{owner}/{repo}/environments/{environment_name}",
        {
            owner: process.env.GITHUB_OWNER,
            repo: repoName,
            environment_name: "production",

            reviewers: [
                {
                    type: "User",
                    id: reviewerId,
                },
            ],

            prevent_self_review: false,

            deployment_branch_policy: {
                protected_branches: true,
                custom_branch_policies: false,
            },

            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );

    console.log(
        `Production environment created for ${repoName}. Reviewer: ${userResponse.data.login}`
    );
}

async function configureRepository(repoName, application) {
    console.log(`Configuring GitHub Actions for ${repoName}...`);

    /*
     * ---------------------------------------------------------
     * GCP CONFIGURATION
     * ---------------------------------------------------------
     */

    if (application.cloud === "GCP") {

        await setRepositoryVariable(
            repoName,
            "GCP_PROJECT_ID",
            process.env.GCP_PROJECT_ID
        );

        if (process.env.CONTAINER_IMAGE) {
            await setRepositoryVariable(
                repoName,
                "CONTAINER_IMAGE",
                process.env.CONTAINER_IMAGE
            );
        }

        await setRepositorySecret(
            repoName,
            "WIF_PROVIDER",
            process.env.WIF_PROVIDER
        );

        await setRepositorySecret(
            repoName,
            "WIF_SERVICE_ACCOUNT",
            process.env.WIF_SERVICE_ACCOUNT
        );

        await createProductionEnvironment(repoName);

        console.log(
            `GCP GitHub Actions configuration completed for ${repoName}`
        );
    }


    /*
     * ---------------------------------------------------------
     * AWS CONFIGURATION
     * ---------------------------------------------------------
     */

    if (application.cloud === "AWS") {

        await setRepositoryVariable(
            repoName,
            "AWS_REGION",
            application.region
        );

        await setRepositoryVariable(
            repoName,
            "AWS_ROLE_ARN",
            process.env.AWS_ROLE_ARN
        );

        await createProductionEnvironment(repoName);

        console.log(
            `AWS GitHub Actions configuration completed for ${repoName}`
        );
    }
}

module.exports = {
    createRepository,
    uploadRepositoryFiles,
    configureRepository,
    createProductionEnvironment,
};