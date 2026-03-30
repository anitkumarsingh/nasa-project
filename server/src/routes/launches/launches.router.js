const express = require('express');
const { getAllLaunches, addLaunchInfo } = require('../../controller/launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/',getAllLaunches);
launchesRouter.post('/',addLaunchInfo);

module.exports = launchesRouter;