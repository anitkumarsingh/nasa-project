const { launches, addLaunch } = require("../models/launches.model")

const getAllLaunches = (req,res) =>{
  return res.status(200).json(Array.from(launches.values()));
}

const addLaunchInfo = (req,res)=>{
  const launch = req.body;
  if(!launch.mission || !launch.rocketType || !launch.launchDate || !launch.distination){
    res.status(400).json({error:'Missing required launch property'})
  }
   launch.luanchDate = new Date(launch.launchDate);
   if(isNaN(launch.launchDate)){
    res.status(400).json({
      error:'Invalid launch date'
    })
   }
   addLaunch(launch)
   res.status(201).json(launch)
}

module.exports ={
    getAllLaunches,
    addLaunchInfo
}