const API_URL = 'http://localhost:8000'


// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => 
  a.flightNumber - b.flightNumber)
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch)
  }

  console.log("hello from httpsubmitlaunch")
  try {
    console.log("hello from the try")
    return await fetch(`${API_URL}/launches`, options)
  } catch (err) {
    console.log("hello from the catch")
    return {
      ok: false
    }
  }
  

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {

  const options = {
    method: 'DELETE'
  }

  try {
    return await fetch(`${API_URL}/launches/${id}`, options)
  } catch (err) {
    return {
      ok: false
    }
}

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};