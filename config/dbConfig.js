const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect(process.env.mongo_url);


const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to database");
});

db.on("error", (err) => {
    console.log("Mongodb failed")
});

