const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs');

const router = express.Router();
const swaggerDocument = YAML.load('./swagger.yaml');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
