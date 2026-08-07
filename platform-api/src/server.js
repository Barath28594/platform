require("dotenv").config();
const express = require("express");
const cors = require("cors");

const applicationRoutes = require("./routes/applicationRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const blueprintRoutes = require("./routes/blueprintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {

    res.json({

        status: "healthy",
        service: "Platform API",
        version: "1.0.0"

    });

});

app.use("/applications", applicationRoutes);

app.use("/catalog", catalogRoutes);

app.use("/blueprints", blueprintRoutes);

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Platform API running on port ${PORT}`);

});