const fetch = require("node-fetch");
require("dotenv").config();
module.exports = function (app) {

    // Get these values from the client and add them the url
    // Placeholders 37.8 / -122.4
    let lat = 0
    let lon = 0

    // Parameters for url
    // 1 km radius
    let radius = 1000
    // Search for Coffee
    let category = 'coffee'

    const key = `Bearer ${process.env.REACT_APP_API_KEY}`
   
    // HTTP request from client
    app.post('/api', function (req, res) {

        // Set lat / lon to retrieved lat / lon
        lat = req.body.lat
        lon = req.body.lon
        //console.log(`server ${lat} and ${lon}`)

        // Yelp API url
        const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&category=${category}&radius=${radius}`

        // ✔ TODO: test call to yelp api and console log to see if it works
        // ✔ TODO: Send this info back to client
        // - The client will place info into respective Views
        const getData = async url => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Authorization": key,
                    }
                });
                const json = await response.json();
                // Refine results to get proper info
                const data = json.businesses
                // ✔ TODO: Send back restaurant coordinates and info here
                res.send(JSON.stringify({
                    'data': data
                }))

            } catch (error) {
                console.log(error);
            }
        };
        // Start the yelp api function
        getData(url);
    })





}