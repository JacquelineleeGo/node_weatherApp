const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFjcXVlbGluZWxlZTEyNiIsImEiOiJjazBvM2twYWswNmt1M25wa3Uzc29jNWVlIn0.fiDp2SDdVIn3PtZKUlu7fQ&limit=1'
    // json: set to be true will parse the data to JSON format automatically
    // {body} means response.body
    request({url, json: true}, (error, {body}) => {
        if(error){ // instead of just console.log the error message, we pass it to callback to let callback function to decide what to do. Flexibility
            callback('Unable to connect to location service') // if we didn't pass the second parameter, 'undefined will be passed' or we explicitely put 'undefined' as the second parameter
        }
        // when the connection is well established, we will get a response
        // however, the response might have the content we want
        // we go to the response and check what error there is
        else if(body.features.length == 0){
            callback('Location not found', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0], 
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode