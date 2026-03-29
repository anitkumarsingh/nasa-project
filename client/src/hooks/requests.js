const BASE_URL = 'http://localhost:6000';

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const req = await fetch(`${BASE_URL}/planets`);
  return await req.json()
  
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const req = await fetch(`${BASE_URL}/launches`);
  const result = await req.json();
  const sortedResult = result.sort((a,b)=>a.flightNumber - b.flightNumber);
  return sortedResult;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
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