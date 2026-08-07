function buildDeploymentPlan(application) {

    switch (application.service) {

        case "Cloud Run":

            return [
                "Artifact Registry",
                "Cloud Run",
                "IAM Service Account",
                "Secret Manager",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "Compute Engine":

            return [
                "VPC Network",
                "Firewall Rules",
                "Compute Engine VM",
                "Persistent Disk",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "GKE":

            return [
                "Artifact Registry",
                "GKE Cluster",
                "Namespace",
                "Workload Identity",
                "Cloud Logging",
                "Cloud Monitoring"
            ];

        case "Lambda":

            return [
                "IAM Role",
                "Lambda Function",
                "CloudWatch Logs",
                "Secrets Manager"
            ];

        case "EKS":

            return [
                "VPC",
                "Private Subnets",
                "EKS Cluster",
                "Node Group",
                "IAM Roles",
                "ECR Repository",
                "CloudWatch",
                "AWS Load Balancer Controller"
            ];

        case "EC2":

            return [
                "VPC",
                "Security Group",
                "EC2 Instance",
                "EBS Volume",
                "CloudWatch"
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

    backup:

        application.service === "Compute Engine" ||
        application.service === "EC2"

};

    return {

        requestId:
            "REQ-" +
            Math.floor(Math.random() * 9000 + 1000),

        status: "Accepted",

        blueprint,

        deploymentPlan:
            buildDeploymentPlan(application)

    };

}

module.exports = {

    provisionApplication

};