const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const swaggerFile = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(swaggerFile);

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

module.exports = router;
