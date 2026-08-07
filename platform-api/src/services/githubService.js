require("dotenv").config();

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({

    auth: process.env.GITHUB_TOKEN

});

async function createRepository(application) {

    const repoName =
        `${application.applicationName}-infra`
            .toLowerCase();

    const response =
    await octokit.repos.createForAuthenticatedUser({

        name: repoName,

        private: false,

        auto_init: false,

        description:
            `Infrastructure repository for ${application.applicationName}`

    });

    return {

        name: response.data.name,

        htmlUrl: response.data.html_url,

        defaultBranch: response.data.default_branch

    };

}

module.exports = {

    createRepository

};

async function uploadRepositoryFiles(repoName, files) {

    for (const [path, content] of Object.entries(files)) {

        await octokit.repos.createOrUpdateFileContents({

            owner: process.env.GITHUB_OWNER,

            repo: repoName,

            path,

            message: `Add ${path}`,

            content: Buffer
                .from(content)
                .toString("base64")

        });

    }

}

module.exports = {

    createRepository,

    uploadRepositoryFiles

};