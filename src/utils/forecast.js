const request = require('request');


const forecast = (longitude, lattitude, callback) =>{

    const url ='https://api.darksky.net/forecast/f1c3d00f8a1504bc2170f6e2f4e29b14/'+longitude +','+lattitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect',undefined)
        }else if(body.error){
            callback('Location is not correct',undefined)
        }else{
            callback(undefined,{
                forecast: 'It is currently '+body.currently.temperature +' degrees out. There is a '+body.currently.precipProbability + '% chance of rain and '+body.currently.summary            
            })

        }
    })

}

module.exports = forecast;