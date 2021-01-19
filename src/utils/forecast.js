const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = "http://api.weatherstack.com/current" +
    "?access_key=ec0ecfbd61cb36a32af1ee50034cb323" +
    "&query=" + latitude + "," + longitude +
    "&units=m"

    request({url: forecastUrl, json: true}, (error, {body: responseBody} = { }) => {  
        if(error){
            callback("Internal low-level error while trying to access weather services", undefined)
        }else if(responseBody.error){
            callback("Error while trying to reach weather services", undefined)
        }else{
            const currentData = responseBody.current
            const temperature = currentData.temperature
            const feelsLike = currentData.feelslike
            const weatherDescription = currentData.weather_descriptions[0]
            callback(undefined, {
                weatherDescription,
                temperature,
                feelsLike
            })
        }   
    })      
}

module.exports = forecast




