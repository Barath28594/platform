const {
    generateTerraform
} = require("./terraformGenerator");

const {
    generateRepository
} = require("./repositoryGenerator");

function buildDeploymentPlan(application) {

    switch (application.service) {

        case "Cloud Run":

            return [
                "Cloud Run",
                "Artifact Registry",
                "IAM Service Account",
                "Secret Manager",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "Compute Engine":

            return [
                "VPC",
                "Firewall Rules",
                "Compute Engine VM",
                "Persistent Disk",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "GKE":

            return [
                "VPC",
                "GKE Cluster",
                "Node Pool",
                "Artifact Registry",
                "Cloud Monitoring"
            ];

        case "AWS Lambda":

            return [
                "Lambda",
                "IAM Role",
                "CloudWatch",
                "S3 Bucket"
            ];

        default:

            return [
                application.service
            ];

    }

}

function provisionApplication(application) {

    const blueprint = {

        service: application.service,

        monitoring: true,

        logging: true,

        secrets: true,

        backup: false

    };

    const terraform = generateTerraform(application);

    const repository = generateRepository(
        application,
        terraform
    );

    return {

        requestId:
            "REQ-" +
            Math.floor(Math.random() * 9000 + 1000),

        status: "Accepted",

        blueprint,

        deploymentPlan:
            buildDeploymentPlan(application),

        terraform,

        repository

    };

}

module.exports = {

    provisionApplication

};