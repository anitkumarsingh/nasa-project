const launches = new Map()
const launch = {
    flightNumber:200,
    mission:'Kepler Exploration X',
    rocketType:'Exlorer IS1',
    launchDate:new Date('December 23, 2030'),
    destination:'Kepler-442 b',
    success:true,
    isUpcoming:true,
    customer:['ZTM','NASA']
}
launches.set(launch.flightNumber,launch);

module.exports={
    launches
}