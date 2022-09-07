const express = require("express")
const router = express.Router()
const fs = require("fs")
router.use(express.urlencoded({ extended: false}))

//function to get prehistoric creatures from DB

const readCreaturesFile = () => {
    // use the FileSystem to read dinosaurs.json
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    // parse the file into json data
    const creaturesData = JSON.parse(creatures)
    return creaturesData
}

//routes for prehistoric creatures
router.get("/", (req, res) => {
    const creaturesData = readCreaturesFile()
    res.render("creatures/index.ejs", {creatures: creaturesData})
})

router.get("/new", (req, res) => {
    res.render("creatures/new.ejs")
})


router.post("/", (req, res) => {
    const creaturesData = readCreaturesFile()
    creaturesData.push(req.body)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creaturesData))
    res.redirect("/prehistoric_creatures")
})

router.get("/:id", (req, res) => {
        // get the dinos from file
        const creaturesData = readCreaturesFile()
        // look up array index from the url route params
        const creature = creaturesData[req.params.id]
        // send back a single dino
        res.render("creatures/show.ejs", {creature : creature})
})

  module.exports = router;