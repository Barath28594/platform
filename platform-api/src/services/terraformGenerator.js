function generateTerraform(application) {

    const provider = generateProvider(application);

    const versions = generateVersions();

    const variables = generateVariables();

    const outputs = generateOutputs(application);

    const main = generateMain(application);

    return {

        "provider.tf": provider,

        "versions.tf": versions,

        "variables.tf": variables,

        "outputs.tf": outputs,

        "main.tf": main

    };

}

function generateProvider(application) {

    if (application.cloud === "AWS") {

        return `

provider "aws" {

    region = "${application.region}"

}

`;

    }

    return `

provider "google" {

    project = "velocity-demo"

    region = "${application.region}"

}

`;

}

function generateVersions() {

    return `

terraform {

    required_version = ">=1.5"

}

`;

}

function generateVariables() {

    return `

variable "application_name" {

    type = string

}

`;

}

function generateOutputs(application) {

    return `

output "application_name" {

    value = "${application.applicationName}"

}

`;

}

function generateMain(application) {

    switch (application.service) {

        case "Cloud Run":

            return `

resource "google_cloud_run_service" "app" {

    name = "${application.applicationName}"

    location = "${application.region}"

}

`;

        case "Compute Engine":

            return `

resource "google_compute_instance" "vm" {

    name = "${application.applicationName}"

    machine_type = "e2-medium"

    zone = "${application.region}-a"

}

`;

        case "GKE":

            return `

resource "google_container_cluster" "cluster" {

    name = "${application.applicationName}"

    location = "${application.region}"

}

`;

        case "AWS Lambda":

            return `

resource "aws_lambda_function" "lambda" {

    function_name = "${application.applicationName}"

}

`;

        case "EC2":

            return `

resource "aws_instance" "vm" {

    ami = "ami-xxxxxxxx"

    instance_type = "t3.medium"

}

`;

        case "EKS":

            return `

resource "aws_eks_cluster" "cluster" {

    name = "${application.applicationName}"

}

`;

        default:

            return "// Unsupported service";

    }

}

module.exports = {

    generateTerraform

};