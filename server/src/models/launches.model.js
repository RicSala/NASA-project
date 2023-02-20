const launches = new Map()
let latestFlightNumber = 100;
// TODO: Review Map data structures

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['ZTM', 'NASA'], 
        upcoming: true,
        success: true,
    }))
}

function existLaunchWithId(id) {
    return launches.has(id)
}

function abortLaunchById(id) {
    const aborted = launches.get(id)
    aborted.upcoming = false
    aborted.success = false
    return aborted

}



export {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchById
} 