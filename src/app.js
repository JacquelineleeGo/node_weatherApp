const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs') // need to tell handlebars where to put our partials -- .hbs files
const geocode = require('../src/utils/geocode')
const forcast = require('../src/utils/forcast')

const app = express() // created an express object

// set up a port number
// port number will be the former, if the former exists
// otherwise the latter
// process.env.PORT to get the port number heroku assigned to my application
const port = process.env.PORT || 3000

// define paths for Express config
const currentDir = __dirname
const homePage = path.join(currentDir, '../public')
const viewPath = path.join(currentDir, '../templates/views')
const partialsPath = path.join(currentDir, '../templates/partials')

// Express will look for a folder called 'views', this is by default
// if we want to customize the folder name, we need to inform Express
// where all the view files are
app.set('view engine', 'hbs') // set up handlebars engine
app.set('views', viewPath) // we dont need this if the folder is called 'views'
hbs.registerPartials(partialsPath)

// set up static dir to serve
app.use(express.static(homePage))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jing'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jing'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page',
        name: 'Jing'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address){
        return res.send({
            error: 'Please input an address.'
        })
    }
    
    // destructuring, we want to provide default object as {latitude, longitude, location} = {}
    // otherwise, then destructuring, latitude, longitude, location
    // can't be extracted, and our server will crash
    // providing an empty project, all those properties will be 'undefined'
    // but the program won't crash
    geocode(address, (error, {latitude, longitude, location} = {})=> {
        if(error){
            return res.send({
                error
            })
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                weather: forcastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jing',
        errorMessage: 'Help article not found.'
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

// match anything except the route handled before
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jing',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
