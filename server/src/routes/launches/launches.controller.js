import { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchById } from "../../models/launches.model.js";

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    
    let launch = req.body;

    if (!launch.mission || !launch.launchDate || !launch.rocket || !launch.target) {
        res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        res.status(400).json({
            error: "Invalid launch date"
        })
    }


    addNewLaunch(launch) 

    return res.status(201).json(launch)

}


function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    if (!existLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch }