const {
    generateCloudRunTerraform
} = require("./cloudrun");

function generateTerraform(application) {

    switch (application.service) {

        case "Cloud Run":

            return generateCloudRunTerraform(application);

        default:

            return generateCloudRunTerraform(application);
    }
}

module.exports = {
    generateTerraform
};