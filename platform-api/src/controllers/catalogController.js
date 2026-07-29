const fs = require("fs");
const path = require("path");

function getCatalog(req, res) {

    const catalogPath = path.join(__dirname, "../data/catalog.json");

    const catalog = JSON.parse(
        fs.readFileSync(catalogPath, "utf8")
    );

    res.json(catalog);

}

module.exports = {
    getCatalog
};