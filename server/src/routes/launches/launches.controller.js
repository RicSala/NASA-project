import { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchById } from "../../models/launches.model.js";


async function httpGetAllLaunches(req, res) {
    return res.status(200).json( await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
    
    let launch = req.body;

    if (!launch.mission || !launch.launchDate || !launch.rocket || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
       return res.status(400).json({
            error: "Invalid launch date"
        })
    }


    await addNewLaunch(launch) 

    return res.status(201).json(launch)

}


async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)
    const existLunch = await existLaunchWithId(launchId)

    if (!existLunch) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }
    const aborted = await abortLaunchById(launchId)
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }

    return res.status(200).json({
        ok: true
    })
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch }


// BUG  when creating new launches, if I don't refresh the page, it doesn't show the last added launch in the upcoming launches page. Same thing happens when deleting. And same thing in the destionation tab