require("dotenv").config();

const {

    createRepository

} = require("./src/services/githubService");

async function run() {

    const repo = await createRepository({

        applicationName: "velocity-demo"

    });

    console.log(repo);

}

run();