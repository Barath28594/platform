const { provisionApplication } = require("../services/provisionEngine");

async function createApplication(req, res) {
  try {
    const application = req.body;

    const result = await provisionApplication(application);

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

      terraform: result.terraform,

      repository: result.repository,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  createApplication,
};