const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const uri = `mongodb+srv://stephanhabermacher:${process.env.MONGO_PASSWORD}@cluster0.fdet0lm.mongodb.net/`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  authSource: "hexagon",
};

async function run() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

app.get("/", function (req, res) {
  res.send("Test");
});

app.listen(3000, () => {
  console.log("Server gestartet");
});
