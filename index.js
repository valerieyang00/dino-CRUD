// required packages
const express = require("express")
const layout = require("express-ejs-layouts")


// express app config
const app = express()
const PORT = 3001

app.set("view engine", "ejs")
app.use(layout)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false}))
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

//Setting up controllers
app.use("/dinosaurs", require("./controllers/dinos.js"))
app.use("/prehistoric_creatures", require("./controllers/creatures.js"))


// route for homepage
app.get("/", (req, res) => {
    res.render("home.ejs")
})

// listen on a port
app.listen(PORT, () => {
    console.log(`is running on PORT ${PORT}`)
})