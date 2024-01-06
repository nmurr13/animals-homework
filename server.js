/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make fruits schema
const animalsSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
})

// make animal model
const Animal = model("Animal", animalsSchema)

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

app.get("/animals/seed", async (req, res) => {
    try {

    // array of starter animals
    const startAnimals = [
        {
            species: "Wolf",
            extinct: false,
            location: "Eurasia and North America",
            lifeExpectancy: 15,
        },
        {
            species: "Tiger",
            extinct: false,
            location: "Asia",
            lifeExpectancy: 20,
        },
        {
            species: "Dodo",
            extinct: true,
            location: "Mauritius",
            lifeExpectancy: 20,
        },
        {
            species: "Wolf",
            extinct: false,
            location: "Eurasia and North America",
            lifeExpectancy: 15,
        },
        {
            species: "Crocodile",
            extinct: false,
            location: "Every Continent except Europe",
            lifeExpectancy: 100,
        },
        {
            species: "Cat",
            extinct: false,
            location: "Worldwide",
            lifeExpectancy: 15,
        },
         
        ]
  
    // Delete All Animals
    await Animal.deleteMany({});

    // Seed my starter animals
    const animals = await Animal.create(startAnimals);

    // send animals as response
    res.json(animals);
  } catch (error) {
    console.log(error.message);
    res.send("There was error, read logs for error details");}
  });

// Index Route Get -> /fruits
app.get("/animals", async (req, res) => {
    try {
      // get all animals
      const animals = await Animal.find({});
      // render a template
      // animals/index.ejs = views/animals/index.ejs
      res.render("animals/index.ejs", {animals})
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });
  // show route
app.get("/animals/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular animal from the database
    Animal.findById(id, (err, animal) => {
        // render the template with the data from the database
        res.render("animals/show.ejs", {animal})
    })
})
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))