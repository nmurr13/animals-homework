//////////////////////////////////
// Import dependencies
/////////////////////////////////
const mongoose = require("./connection");
const Animal = require("./Animal");

//////////////////////////////////
// Seed Code
//////////////////////////////////
mongoose.connection.on("open", async () => {
  // seed code goes in this function

  // Run any database queries in this function
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

  // Delete all animals
  await Animal.remove({});

  // Seed Starter Animals
  const data = await Animal.create(startAnimals);

  // log the create animals to confirm
  console.log("--------ANIMALS CREATED----------");
  console.log(data);
  console.log("--------ANIMALS CREATED----------");

  // close the DB connection
  mongoose.connection.close();
});