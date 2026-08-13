const { generateTerraform } = require("../terraform/terraformGenerator");
const { generateRepository } = require("./repositoryGenerator");
const {
  createRepository,
  uploadRepositoryFiles,
  configureRepository,
} = require("./githubService");

function buildDeploymentPlan(application) {

    switch (application.service) {

        case "Cloud Run":
            return [
                "Cloud Run",
                "Artifact Registry",
                "IAM Service Account",
                "Secret Manager",
                "Cloud Logging",
                "Cloud Monitoring",
            ];

        case "Compute Engine":
            return [
                "VPC",
                "Firewall Rules",
                "Compute Engine VM",
                "Persistent Disk",
                "Cloud Logging",
                "Cloud Monitoring",
            ];

        case "GKE":
            return [
                "VPC",
                "GKE Cluster",
                "Node Pool",
                "Artifact Registry",
                "Cloud Monitoring",
            ];

        case "EC2":
            return [
                "VPC",
                "Security Group",
                "EC2 Instance",
                "EBS Volume",
                "IAM Role",
                "CloudWatch",
            ];

        case "AWS Lambda":
            return [
                "Lambda",
                "IAM Role",
                "CloudWatch",
                "S3 Bucket",
            ];

        default:
            return [application.service];
    }
}

async function provisionApplication(application) {
  const blueprint = {
    service: application.service,
    monitoring: true,
    logging: true,
    secrets: true,
    backup: false,
  };

  const terraform = generateTerraform(application);

const repositoryFiles = generateRepository(
  application,
  terraform
);

const repository = await createRepository(application);

await configureRepository(repository.name);

await uploadRepositoryFiles(
  repository.name,
  repositoryFiles
);

  return {
    requestId: "REQ-" + Math.floor(Math.random() * 9000 + 1000),

    status: "Accepted",

    blueprint,

    deploymentPlan: buildDeploymentPlan(application),

    repository,

    terraform,
  };
}

module.exports = {
  provisionApplication,
};