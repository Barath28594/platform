let requestCounter = 1001;

exports.createApplication = (req, res) => {

    const {

        applicationName,
        owner,
        team,

        cloud,
        region,
        environment,

        service

    } = req.body;

    const requestId = `REQ-${requestCounter++}`;

    console.log("Provision Request");

    console.log({

        requestId,

        applicationName,
        owner,
        team,

        cloud,
        region,
        environment,

        service

    });

    res.status(202).json({

        requestId,

        status: "Accepted",

        applicationName,
        owner,
        team,

        cloud,
        region,
        environment,

        service

    });

};