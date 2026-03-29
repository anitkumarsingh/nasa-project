const express = require('express');
const { getAllLaunches } = require('../../controller/launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/',getAllLaunches);

module.exports = launchesRouter;