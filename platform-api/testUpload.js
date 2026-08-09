require("dotenv").config();

const {
    createRepository,
    uploadRepositoryFiles
} = require("./src/services/githubService");

const {
    generateTerraform
} = require("./src/services/terraformGenerator");

const {
    generateRepository
} = require("./src/services/repositoryGenerator");


async function run() {

    const application = {

        applicationName: "velocity-cloudrun-demo",

        owner: "Barath",

        team: "Platform",

        cloud: "GCP",

        region: "asia-south1",

        environment: "dev",

        service: "Cloud Run"

    };


    console.log("Generating Terraform...");

    const terraform =
        generateTerraform(application);


    console.log("Generating repository files...");

    const files =
        generateRepository(
            application,
            terraform
        );


    console.log("Creating GitHub repository...");

    const repo =
        await createRepository(application);


    console.log(
        `Repository created: ${repo.htmlUrl}`
    );


    console.log("Uploading repository files...");


    await uploadRepositoryFiles(
        repo.name,
        files
    );


    console.log("");
    console.log("=================================");
    console.log("Velocity repository created");
    console.log("=================================");
    console.log("");
    console.log("Repository:");
    console.log(repo.htmlUrl);
    console.log("");
    console.log("Files uploaded:");

    Object.keys(files).forEach(
        file => console.log(`- ${file}`)
    );

}


run().catch(error => {

    console.error("");
    console.error("Repository generation failed:");
    console.error(error);

    process.exit(1);

});