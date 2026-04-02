const BASE_URL = 'http://localhost:4000';

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const req = await fetch(`${BASE_URL}/planets`);
  const result = await req.json();
  console.log('res',result)
  return result?.planets.splice(0,10);
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const req = await fetch(`${BASE_URL}/launches`);
  const result = await req.json();
  const sortedResult = result?.sort((a,b)=>a.launchDate -b.launchDate);
  return sortedResult;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  return await fetch(`${BASE_URL}/launches`,{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(launch)
  })
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};