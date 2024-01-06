//////////////////////////////////////
//Import Dependencies
///////////////////////////////////////
const express = require("express")
const Animal = require("../models/Animal")

//////////////////////////////////////
// Create the Router
///////////////////////////////////////
const router = express.Router()


////////////////////////////////////////////
// Routes
////////////////////////////////////////////

router.get("/seed", async (req, res) => {
    try {

    // array of starter animals
    const startAnimals = [
       
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

// Index Route Get -> /animals
router.get("/", async (req, res) => {
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

  // New
  router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
  })

  // Create Route (Post to /fruits)
router.post("/", async (req, res) => {
    try {
      // check if extinct is true
      // expression ? true : false (ternary operator)
      req.body.extinct = req.body.extinct === "on" ? true : false;
      // create the animal in the database
      await Animal.create(req.body);
      // redirect back to main page
      res.redirect("/animals");
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });

  // Edit Route (Get to /animals/:id/edit)
router.get("/:id/edit", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;
      // get the animal from the db
      const animal = await Animal.findById(id);
      //render the template
      res.render("animals/edit.ejs", { animal });
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });

  // The Update Route (Put to /animals/:id)
router.put("/:id", async (req, res) => {
    try {
      // get the id
      const id = req.params.id;
      // update extinct in req.body
      req.body.extinct = req.body.extinct === "on" ? true : false;
      // update the animal in the database
      await Animal.findByIdAndUpdate(id, req.body);
      // res.redirect back to show page
      res.redirect(`/animals/${id}`);
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });

  // The Delete Route (delete to /animals/:id)
router.delete("/:id", async (req, res) => {
    // get the id
    const id = req.params.id
    // delete the animal
    await Animal.findByIdAndDelete(id)
    // redirect to main page
    res.redirect("/animals")
  });

// The Show Route (Get to /animals/:id)
router.get("/:id", async (req, res) => {
    try{
        // get the id from params
        const id = req.params.id

        // find the particular animal from the database
        const animal = await Animal.findById(id)

        // render the template with the animal
        res.render("animals/show.ejs", {animal})
    }catch(error){
        console.log("-----", error.message, "------")
        res.status(400).send("error, read logs for details")
    }
})



/////////////////////////////////////
// Export the Router
//////////////////////////////////////
module.exports = router