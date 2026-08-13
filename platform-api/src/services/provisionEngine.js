const {
    generateTerraform
} = require("../terraform/terraformGenerator");

const {
    generateRepository
} = require("./repositoryGenerator");

const {
    createRepository,
    uploadRepositoryFiles,
    configureRepository,
} = require("./githubService");


/*
 * =========================================================
 * DEPLOYMENT PLAN
 * =========================================================
 */

function buildDeploymentPlan(application) {

    switch (application.service) {

        /*
         * -----------------------------------------------------
         * GCP CLOUD RUN
         * -----------------------------------------------------
         */

        case "Cloud Run":

            return [
                "Cloud Run",
                "Artifact Registry",
                "IAM Service Account",
                "Secret Manager",
                "Cloud Logging",
                "Cloud Monitoring",
            ];


        /*
         * -----------------------------------------------------
         * GCP COMPUTE ENGINE
         * -----------------------------------------------------
         */

        case "Compute Engine":

            return [
                "VPC",
                "Firewall Rules",
                "Compute Engine VM",
                "Persistent Disk",
                "Cloud Logging",
                "Cloud Monitoring",
            ];


        /*
         * -----------------------------------------------------
         * GCP GKE
         * -----------------------------------------------------
         */

        case "GKE":

            return [
                "VPC",
                "GKE Cluster",
                "Node Pool",
                "Artifact Registry",
                "Cloud Monitoring",
            ];


        /*
         * -----------------------------------------------------
         * AWS EC2
         * -----------------------------------------------------
         */

        case "EC2":

            return [
                "Default VPC",
                "Security Group",
                "EC2 Instance",
                "Amazon Linux 2023",
                "EBS Root Volume",
                "EC2 Instance Tags",
            ];


        /*
         * -----------------------------------------------------
         * AWS LAMBDA
         * -----------------------------------------------------
         */

        case "AWS Lambda":

            return [
                "Lambda",
                "IAM Role",
                "CloudWatch",
                "S3 Bucket",
            ];


        default:

            return [
                application.service
            ];
    }
}


/*
 * =========================================================
 * PROVISION APPLICATION
 * =========================================================
 */

async function provisionApplication(application) {

    /*
     * Platform blueprint metadata
     */

    const blueprint = {

        service: application.service,

        monitoring: true,

        logging: true,

        secrets: true,

        backup: false,
    };


    /*
     * Generate Terraform
     */

    const terraform =
        generateTerraform(application);


    /*
     * Generate complete repository
     */

    const repositoryFiles =
        generateRepository(
            application,
            terraform
        );


    /*
     * Create GitHub repository
     */

    const repository =
        await createRepository(
            application
        );


    /*
     * Configure cloud-specific
     * GitHub Actions authentication
     */

    await configureRepository(
        repository.name,
        application
    );


    /*
     * Upload generated infrastructure
     */

    await uploadRepositoryFiles(
        repository.name,
        repositoryFiles
    );


    /*
     * Generate request ID
     */

    const requestId =
        "REQ-" +
        Date.now().toString(36).toUpperCase();


    /*
     * Return provisioning result
     */

    return {

        requestId,

        status: "Accepted",

        blueprint,

        deploymentPlan:
            buildDeploymentPlan(
                application
            ),

        repository,

        terraform,
    };
}


module.exports = {
    provisionApplication,
};