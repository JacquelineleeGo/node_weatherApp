const request = require('request')


const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8843f4e9a0ee58c41e46d47ccd9ae730/' + latitude + ',' + longitude

    request({
        url,
        json: true
    }, (error,{body}) => {
        if(error){
            callback('Unable to connect weather service', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, 
                body.daily.data[0].summary + 
                ' It is currently ' + body.currently.temperature + 
                '; with low of ' + body.daily.data[0].temperatureLow +
                ', and high of ' + body.daily.data[0].temperatureHigh + 
                '. And the chance of rain is ' + body.currently.precipProbability + '%.'
            )
        }
    })
}

module.exports = forcast