const {
    generateTerraform
} = require("./terraformGenerator");

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
                "Firewall",
                "Compute Engine",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "GKE":

            return [
                "VPC",
                "GKE Cluster",
                "Artifact Registry",
                "IAM",
                "Cloud Monitoring"
            ];

        case "AWS Lambda":

            return [
                "Lambda",
                "IAM Role",
                "CloudWatch",
                "S3 Bucket"
            ];

        case "EC2":

            return [
                "VPC",
                "Security Group",
                "EC2",
                "CloudWatch"
            ];

        case "EKS":

            return [
                "VPC",
                "EKS Cluster",
                "IAM",
                "CloudWatch"
            ];

        default:

            return [];

    }

}

function buildBlueprint(application) {

    return {

        service: application.service,

        monitoring: true,

        logging: true,

        secrets: true,

        backup: false

    };

}

function provisionApplication(application) {

    const blueprint = buildBlueprint(application);

    const deploymentPlan = buildDeploymentPlan(application);

    const terraform = generateTerraform(application);

    return {

        requestId:
            "REQ-" +
            Math.floor(Math.random() * 9000 + 1000),

        status: "Accepted",

        blueprint,

        deploymentPlan,

        terraform

    };

}

module.exports = {

    provisionApplication

};