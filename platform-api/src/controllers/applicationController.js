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

        team: application.team,

        cloud: application.cloud,

        region: application.region,

        environment: application.environment,

        service: application.service,

        blueprint: result.blueprint,

        deploymentPlan: result.deploymentPlan,

        terraform: result.terraform

    });

}

module.exports = {

    createApplication

};