const request = require("postman-request")

const geocode = (address, callback) => {
    const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/'" +
    encodeURIComponent(address) + "'.json" +
    "?access_token=pk.eyJ1IjoiYWRhaXJoeiIsImEiOiJja2sxcWZ3NzMwcmE1MnZxajB1MjhjamUzIn0.chMvcuKt_z067vkRtedZ7w" +
    "&language=es&limit=1"

    request({url: mapboxUrl, json: true}, (error, {body:responseBody} = { }) => {
        if(error){
            callback("Unable to connect to geocode service", undefined)
        }else if(responseBody.message){
            callback("Error while trying to reach geocode service", undefined)
        }else if(responseBody.features.length === 0){
            callback("Unable to find location. Try another search", undefined)
        }else{
            
            callback(undefined, {
                latitude: responseBody.features[0].center[1],
                longitude: responseBody.features[0].center[0],
                location: responseBody.features[0].place_name
            })
        }
    })

}

module.exports = geocode