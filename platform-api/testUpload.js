require("dotenv").config();

const {

    createRepository,

    uploadRepositoryFiles

} = require("./src/services/githubService");

async function run() {

    const repo = await createRepository({

        applicationName: "upload-test"

    });

    await uploadRepositoryFiles(

        repo.name,

        {

            "README.md":
                "# Upload Test",

            "main.tf":
                'resource "null_resource" "demo" {}',

            ".github/workflows/demo.yml":

`name: Demo

on: push

jobs:

  test:

    runs-on: ubuntu-latest

    steps:

      - run: echo Hello`

        }

    );

    console.log(repo);

}

run();