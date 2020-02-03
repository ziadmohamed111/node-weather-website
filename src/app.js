const hbs = require("hbs"); 
const path = require("path") 
const express = require("express");
const geodode = require("./utils/geocode")
const forecast = require("./utils/forecast");

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handelbars engin and views location
app.set('view engine' , 'hbs')
app.set("views" , viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get("" , (req,res) => {
    res.render('index' , {
        title : "Weather",
        name : "Zeyad"
    })
})

app.get("/about" , (req,res) => {
    res.render('about' , {
        title : "About me",
        name : "Zeyad"
    })
})

app.get("/help" , (req,res) => {
    res.render('help' , {
        title : "Help",
        name : "zeyad",
        message : "some helpful text"
    })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404!",
    errorMessage: "help article not found :(",
    name: "Zeyad Mohamed"
  });
});

app.get('/weather' , (req , res )=>{
    
    if(!req.query.address){
        return res.send({
            err : "you must provide a address query"
        })
    }

    geodode(req.query.address , (err ,data = {}) => {
        if(err){
            return res.send({err})
        }
        forecast(data , (err , forecastData)=>{
            if(err){
                return resData.send({ err });
            }
            res.send({
              forecastData: forecastData,
              location: data.location,
              address: req.query.address,
            });    
        })

    });
})

app.get('/products' , (req , res )=>{
    if(!req.query.search){
        return res.send({
            err : "you must provide a search query"
        })
    }
    res.send({
        products : []
    });
})

app.get('*' , (req , res )=>{
    res.render("404", {
      title: "404!",
      errorMessage: "Page not Found :(",
      name: "Zeyad Mohamed"
    });
})

app.listen(port,()=>{
    console.log("server is up on port" + port )
})

