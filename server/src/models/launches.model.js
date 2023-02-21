import launchesMongo from "./launches.mongo.js";
import planetsMongo from "./planets.mongo.js"; // TODO: Tip: when working in layers (kind of like MVC...) it's usually better to work with a lower layer

const DEFAULT_FLIGHT_NUMBER = 100
// TODO: Review Map data structures

async function getAllLaunches() {
    return await launchesMongo.find({}, '-_id -__v') 
}

async function saveLaunch(launch) {

    const planet = await planetsMongo.findOne({
        keplerName: launch.target,
    })

    if (!planet) {
        throw new Error("No matching planet was found")
    }
    await launchesMongo.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })

}

async function getLatesFlightNumber() {
    const latestLaunch = await launchesMongo.findOne().sort('-flightNumber')
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }
    
    return latestLaunch.flightNumber; //TODO between you get this number and you update the database...it can have changed, right?
}


async function addNewLaunch(launch) {
    
    const latestFlightNumber = await getLatesFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        upcoming: true,
        success: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: latestFlightNumber
    })
    saveLaunch(newLaunch)
}

async function existLaunchWithId(id) {
    return (await launchesMongo.findOne({
        flightNumber: id
    }))
}

async function abortLaunchById(id) {

    const aborted = await launchesMongo.updateOne({
        flightNumber: id
    }, {
        upcoming: false,
        success: false,
    })
    return aborted.modifiedCount === 1
}


export {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchById
} 