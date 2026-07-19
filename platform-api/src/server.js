const express = require("express");
const cors = require("cors");

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Platform API running on port ${PORT}`);
});
