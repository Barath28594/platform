const {
    generateCloudRunTerraform
} = require("./cloudrun");

const {
    generateComputeEngineTerraform
} = require("./computeengine");

const {
    generateEC2Terraform
} = require("./ec2");


function generateTerraform(application) {

    /*
     * =========================================================
     * GCP
     * =========================================================
     */

    if (application.cloud === "GCP") {

        switch (application.service) {

            case "Cloud Run":

                return generateCloudRunTerraform(
                    application
                );


            case "Compute Engine":

                return generateComputeEngineTerraform(
                    application
                );


            default:

                throw new Error(
                    `Unsupported GCP service: ${application.service}`
                );
        }
    }


    /*
     * =========================================================
     * AWS
     * =========================================================
     */

    if (application.cloud === "AWS") {

        switch (application.service) {

            case "EC2":

                return generateEC2Terraform(
                    application
                );


            default:

                throw new Error(
                    `Unsupported AWS service: ${application.service}`
                );
        }
    }


    /*
     * =========================================================
     * UNKNOWN CLOUD
     * =========================================================
     */

    throw new Error(
        `Unsupported cloud provider: ${application.cloud}`
    );
}


module.exports = {
    generateTerraform
};