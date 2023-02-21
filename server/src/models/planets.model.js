import fs from 'fs'
import path from 'path'
import url from 'url'
import { parse } from 'csv-parse'
import planetsMongo from './planets.mongo.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


// readable.pipe(writable)

function habitablePlanet(planet) {
    return planet.koi_disposition === 'CONFIRMED'
        && planet.koi_insol > 0.36 && planet.koi_insol < 1.11
        && planet.koi_prad < 1.6;
}


function loadPlanetsData() {

    // TODO: Does it make sense to load the planets EACH time we start the server? Even if it's an upsert...we could just load the data once (either manually or parsing a file) in the backend
    // and then use the DB, right?

    // TODO: What DB is the optimal for indie projects whose data structure is not yet defined? Can we start with a nosql db and once we have it clear move to sql? is that...a common approach?

    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
                delimiter: ','
            }))
            .on('data', async (data) => {
                if (habitablePlanet(data)) {
                    savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err)
                reject(err)
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length
                console.log(`${countPlanetsFound} habitable planets`)
                resolve();
                console.log("done")
            })

    })
    
}

async function getAllPlanets() {
    return await planetsMongo.find({}, '-__v -_id')
}

async function savePlanet(planet) {

    try {
        return await planetsMongo.updateOne({
            keplerName: planet.kepler_name,   //criteria to select the planet
        }, {
            keplerName: planet.kepler_name,   //update to make
        }, {
            upsert: true,                   //it's upsert? (inserts if it doesnt exist, otherwise update)
        })
    } catch (err) {
        console.error(`We could not save the planet - ${err}`)
    }
}

// TODO Learning notes MongoDB

export {
    getAllPlanets,
    loadPlanetsData
}