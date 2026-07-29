const fs = require("fs");
const path = require("path");

exports.getBlueprints = (req, res) => {

    const filePath = path.join(
        __dirname,
        "../../catalog/blueprints.json"
    );

    const data = fs.readFileSync(filePath, "utf8");

    res.json(JSON.parse(data));

};