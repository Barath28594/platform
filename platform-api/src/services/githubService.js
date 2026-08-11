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

async function configureRepository(repoName) {
  console.log(`Configuring GitHub Actions for ${repoName}...`);

  // Repository variables
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

  // Repository secrets
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

  console.log(`GitHub Actions configuration completed for ${repoName}`);
}

module.exports = {
  createRepository,
  uploadRepositoryFiles,
  configureRepository,
};