const express = require("express")
const router = express.Router()
const fs = require("fs")
router.use(express.urlencoded({ extended: false}))

//function to get Dinos from DB
const readDinoFile = () => {
    // use the FileSystem to read dinosaurs.json
    const dinos = fs.readFileSync("./dinosaurs.json")
    // parse the file into json data
    const dinoData = JSON.parse(dinos)
    return dinoData
}

// GET /dinosaurs -- show all dinos
router.get("/", (req, res) => {
    const dinoData = readDinoFile()
    res.render("dinos/index.ejs", {dinos: dinoData})
})

// GET /dinosaurs/new -- display a form to create a new dino
router.get("/new", (req, res) => {
    res.render("dinos/new.ejs")
})

// POST /dinosaurs -- create a new dino in the DB
router.post("/", (req, res) => {
    // read the dino file
    const dinoData = readDinoFile()
    // payload of data from the request body (req.body)
    // push the data payload into the array of dinos
    dinoData.push(req.body)
    // save the dino file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    // on POST routes -- do not render a template (this rule can be broken, but way to keep it simple)
    // redirect to where you can find a template
    // redirects tell browsers to make a GET request on a url
    res.redirect("/dinosaurs")
})

// GET /dinosaurs/:id -- display details of one specific dino
router.get("/:id", (req, res) => {
    // get the dinos from file
    const dinoData = readDinoFile()
    // look up array index from the url route params
    const dino = dinoData[req.params.id]
    // send back a single dino
    res.render("dinos/show.ejs", { dino : dino})
})


  module.exports = router;