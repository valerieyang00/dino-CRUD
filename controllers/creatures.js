const express = require("express")
const router = express.Router()
const fs = require("fs")
router.use(express.urlencoded({ extended: false}))
const methodOverride = require("method-override")
router.use(methodOverride("_method"))

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

router.delete("/:id", (req,res) => {
    const creaturesData = readCreaturesFile()
    const creature = creaturesData[req.params.id]
    // res.render("dinos/edit.ejs")
    // remove a dinosaur from the array
    // .splice is an array method that takes 2 arguments:
    // array.splice(indexToBeginAt, # of things to remove)
    creaturesData.splice(req.params.id, 1)
    //save the new dinosaurs tot he dinosaurs.json file
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creaturesData))
    res.redirect("/prehistoric_creatures")
})

router.get("/edit/:id", (req, res) => {
    const creaturesData = readCreaturesFile()
    const creature = creaturesData[req.params.id]
    res.render("creatures/edit.ejs", { creature: creature, pcID: req.params.id})

})

router.put('/:id', (req,res) => {
    const creaturesData = readCreaturesFile()

    // reassign the name and type of the dinosaur we are editing
    creaturesData[req.params.id].type = req.body.type
    creaturesData[req.params.id].img_url = req.body.img_url

    // save the edited dinosaurs to the dinosaur.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('/prehistoric_creatures')

})




  module.exports = router;