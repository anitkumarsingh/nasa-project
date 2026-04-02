const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Exlorer IS1',
    launchDate:new Date('December 23, 2030'),
    target:'Kepler-442 b',
    success:true,
    isUpcoming:true,
    customer:['ZTM','NASA']
}
launches.set(launch.flightNumber,launch);

const addLaunch = (launch) =>{
  latestFlightNumber++;
  launches.set(latestFlightNumber,Object.assign(launch,{
    latestFlightNumber,
    success:true,
    isUpcoming:true,
    customer:['Zero To Mastery', 'NaSa']
  }))
}

module.exports={
    launches,
    addLaunch
}