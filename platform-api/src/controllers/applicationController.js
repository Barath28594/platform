exports.createApplication = (req, res) => {

    const { applicationName, runtime, environment, owner } = req.body;

    // Basic validation
    if (!applicationName) {
        return res.status(400).json({
            error: "Application name is required"
        });
    }

    console.log("==================================");
    console.log("Provision Request Received");
    console.log(req.body);
    console.log("==================================");

    res.status(201).json({
        requestId: "REQ-1001",
        status: "Accepted",
        applicationName,
        runtime,
        environment,
        owner
    });

};