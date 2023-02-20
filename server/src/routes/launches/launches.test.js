import request from 'supertest'
import app from '../../app';


describe('Test GET /launches', () => {
    test('It should respond with 200 SUCCESS', async () => {
        const response = await request(app).get('/launches')
            .expect(200)
        .expect('Content-Type', /json/)
        
    })

})

describe('Test POST /launches', () => {
    const launchTest = {
        mission: "Test Mission!",
        rocket: "Test Rocket - it's made of cardboard...",
        target: "nowhere actually",
        launchDate: "January 14, 2028"
    }

    const launchTestWithoutDate = {
        mission: "Test Mission!",
        rocket: "Test Rocket - it's made of cardboard...",
        target: "nowhere actually",
    }

    const launchTestWithErrorDate = {
        mission: "Test Mission!",
        rocket: "Test Rocket - it's made of cardboard...",
        target: "nowhere actually",
        launchDate: "zoot"

    }
    
    test('It should respond with 201 CREATED', async () => {
        
        const response = await request(app)
            .post('/launches')
            .send(launchTest)
            .expect(201)
            .expect("Content-Type", /json/);
        
        
        // So far, we are using SuperTest assertions (get, post, send, expect)
        // now we are gonna use Jest assertion API
        // When we want to work with the body, we usually use Jest API

        const expectedDate = new Date(launchTest.launchDate).valueOf()
        const receivedDate = new Date(response.body.launchDate).valueOf()

        expect(receivedDate).toBe(expectedDate)

        expect(response.body).toMatchObject(launchTestWithoutDate)
        
        
    })

    test('It should cath missing required properties', async () => {

        const response = await request(app)
            .post('/launches')
            .send(launchTestWithoutDate)
            .expect(400)
        
        expect(response.body).toStrictEqual({error: "Missing required launch property"})


    })

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchTestWithErrorDate)
            .expect(400)

        expect(response.body).toStrictEqual({error: "Invalid launch date"})

    })


} )