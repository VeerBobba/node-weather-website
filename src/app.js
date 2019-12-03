const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
 const forecast = require('./utils/forecast');

const app = express()
// DEfine paths for Express Config
const publicPath =path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
// Setup Handle Bars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup the public folder path
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather App",name:"Veeranna Home"})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About me',name:'Veeranna About'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',message:'Help1 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, deserunt accusantium itaque, vitae illo quis asperiores eligendi hic, necessitatibus non eos consequatur quibusdam amet nobis fugiat eum nam beatae aspernatur.',name:'Veeranna Help'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address is required for search"
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
     
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(lattitude,longitude, (error, {forecast}={}) => {
               if(error){
                return res.send({
                    error:error
                })
            }
                return res.send({
                    location:location,
                    forecast:forecast,
                    address: req.query.address
                })
             
        });
        
   });

   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must Provide a Search Term'
        })
    }
    res.send({
        products:[]
        }) 
})

app.get('/help/*',(req,res)=>{
    res.render('404Page',{title:'404',message:'Help Page not Found',name:'Veeranna Error'})
})
app.get('*',(req,res)=>{
    res.render('404Page',{title:'404',message:'Page not Found',name:'Veeranna Page Error'})
})

app.listen(3000,()=>{
    console.log('Sever is up on 3000')
})