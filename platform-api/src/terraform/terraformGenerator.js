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

    if (application.cloud === "GCP") {

        switch (application.service) {

            case "Cloud Run":
                return generateCloudRunTerraform(application);

            case "Compute Engine":
                return generateComputeEngineTerraform(application);

            default:
                throw new Error(
                    `Unsupported GCP service: ${application.service}`
                );
        }
    }


    if (application.cloud === "AWS") {

        switch (application.service) {

            case "EC2":
                return generateEC2Terraform(application);

            default:
                throw new Error(
                    `Unsupported AWS service: ${application.service}`
                );
        }
    }


    throw new Error(
        `Unsupported cloud provider: ${application.cloud}`
    );
}


module.exports = {
    generateTerraform
};