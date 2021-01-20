const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const app = express()
const port = process.env.PORT || 3000

//Setup handlebars engine and views location
app.set("views", viewsPath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/", (request, response) => {
    response.render("index", {
        title: "Weather App",
        name: "Adair Hernández"
    })
})

app.get("/about", (request, response) => {
    response.render("about", {
        title: "About Me",
        name: "Adair Hernández"
    })
})

app.get("/help", (request, response) => {
    response.render("help", {
        title: "Help",
        name: "Adair Hernández"
    })
})

app.get("/weather", ({ query }, response) => {
    if (query.address) {
        geocode(query.address, (error, { location, latitude, longitude } = {}) => {
            if (error) {
                return response.send({ error })
            }

            forecast(latitude, longitude, (error, forecastResponse) => {
                if (error) {
                    return response.send({ error })
                }
                response.send({
                    location,
                    forecast: forecastResponse.weatherDescription,
                    address: query.address
                })
            })

        })
    } else {
        response.send({
            error: "You must provide an address"
        })
    }
})

app.get("/products", (request, response) => {
    if (request.query.search) {
        response.send({
            products: []
        })
    } else {
        response.send({
            error: "You must provide a search term"
        })
    }
})

app.get("/help/*", (request, response) => {
    response.render("not-found", {
        title: "404",
        name: "Adair Hernández",
        errorMessage: "Help article not found"
    })
})

app.get("*", (request, response) => {
    response.render("not-found", {
        title: "404",
        name: "Adair Hernández",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})