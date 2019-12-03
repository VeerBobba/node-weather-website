const request = require('request');

const geocode = (address, callback)=>{

    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoidmVlcmFib2JiYSIsImEiOiJjazJ6YnJ1NGswNTBwM2NsM3E2cDExOTg1In0.9hOXPbU6qyGTyeHFhiqP0g&limit=1'
   
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect',undefined)
        }else if(body.features.length === 0){
            callback('Location is not correct, Please search again',undefined)
        }else{
            callback(undefined,{
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })

}

module.exports = geocode;

