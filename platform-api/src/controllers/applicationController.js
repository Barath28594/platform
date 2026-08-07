const {
    provisionApplication
} = require("../services/provisionEngine");

function createApplication(req, res) {

    const application = req.body;

    const result = provisionApplication(application);

    res.status(201).json({

        requestId: result.requestId,

        status: result.status,

        applicationName: application.applicationName,

        owner: application.owner,

        cloud: application.cloud,

        region: application.region,

        environment: application.environment,

        type: application.type,

        blueprint: result.blueprint,

        deploymentPlan: result.deploymentPlan

    });

}

module.exports = {

    createApplication

};