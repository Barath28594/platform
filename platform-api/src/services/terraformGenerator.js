function generateTerraform(application) {

    const provider = generateProvider(application);

    const versions = generateVersions(application);

    const variables = generateVariables();

    const main = generateMain(application);

    const outputs = generateOutputs(application);

    const terraformVarsExample =
        generateTerraformVarsExample(application);

    return {

        "provider.tf": provider,

        "versions.tf": versions,

        "variables.tf": variables,

        "main.tf": main,

        "outputs.tf": outputs,

        "terraform.tfvars.example":
            terraformVarsExample

    };

}


function generateProvider(application) {

    if (application.cloud === "AWS") {

        return `
provider "aws" {

  region = var.region

}
`;

    }

    return `
provider "google" {

  project = var.gcp_project

  region = var.region

}
`;

}


function generateVersions(application) {

    if (application.cloud === "AWS") {

        return `
terraform {

  required_version = ">= 1.5.0"

  required_providers {

    aws = {

      source  = "hashicorp/aws"

      version = "~> 6.0"

    }

  }

}
`;

    }

    return `
terraform {

  required_version = ">= 1.5.0"

  required_providers {

    google = {

      source  = "hashicorp/google"

      version = "~> 6.0"

    }

  }

}
`;

}


function generateVariables() {

    return `
variable "gcp_project" {

  description = "GCP project ID"

  type = string

}


variable "region" {

  description = "Cloud region"

  type = string

}


variable "application_name" {

  description = "Application name"

  type = string

}


variable "container_image" {

  description = "Container image"

  type = string

}
`;

}


function generateMain(application) {

    if (application.cloud === "GCP") {

        switch (application.service) {

            case "Cloud Run":

                return `
resource "google_project_service" "run" {

  project = var.gcp_project

  service = "run.googleapis.com"

  disable_on_destroy = false

}


resource "google_cloud_run_v2_service" "app" {

  name = var.application_name

  location = var.region

  deletion_protection = false


  template {

    containers {

      image = var.container_image

      ports {

        container_port = 8080

      }

    }

  }


  depends_on = [

    google_project_service.run

  ]

}
`;

            case "Compute Engine":

                return `
resource "google_compute_instance" "vm" {

  name = var.application_name

  machine_type = "e2-medium"

  zone = "${application.region}-a"


  boot_disk {

    initialize_params {

      image = "debian-cloud/debian-12"

    }

  }


  network_interface {

    network = "default"

    access_config {}

  }

}
`;

            case "GKE":

                return `
resource "google_container_cluster" "cluster" {

  name = var.application_name

  location = var.region

  deletion_protection = false


  initial_node_count = 1

}
`;

            default:

                return `
# Unsupported GCP service

# Service: ${application.service}
`;

        }

    }


    if (application.cloud === "AWS") {

        switch (application.service) {

            case "Lambda":

            case "AWS Lambda":

                return `
resource "aws_lambda_function" "lambda" {

  function_name = var.application_name

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

  name = var.application_name

}
`;

            default:

                return `
# Unsupported AWS service

# Service: ${application.service}
`;

        }

    }


    return `
# Unsupported cloud

# Cloud: ${application.cloud}

# Service: ${application.service}
`;

}


function generateOutputs(application) {

    if (
        application.cloud === "GCP" &&
        application.service === "Cloud Run"
    ) {

        return `
output "application_name" {

  value = google_cloud_run_v2_service.app.name

}


output "service_url" {

  value = google_cloud_run_v2_service.app.uri

}
`;

    }


    return `
output "application_name" {

  value = var.application_name

}
`;

}


function generateTerraformVarsExample(application) {

    return `
gcp_project = "YOUR_GCP_PROJECT_ID"

region = "${application.region}"

application_name = "${application.applicationName}"

container_image = "us-docker.pkg.dev/cloudrun/container/hello"
`;

}


module.exports = {

    generateTerraform

};