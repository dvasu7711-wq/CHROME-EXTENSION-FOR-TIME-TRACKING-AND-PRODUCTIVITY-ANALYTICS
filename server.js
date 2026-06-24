const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productivity");

const TimeSchema = new mongoose.Schema({
  site: String,
  time: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const TimeData = mongoose.model("TimeData", TimeSchema);

// Add sample data once
async function addSampleData() {
  const count = await TimeData.countDocuments();

  if (count === 0) {
    await TimeData.insertMany([
      {
        site: "github.com",
        time: 30,
        category: "productive"
      },
      {
        site: "youtube.com",
        time: 20,
        category: "unproductive"
      },
      {
        site: "google.com",
        time: 10,
        category: "unproductive"
      }
    ]);

    console.log("Sample data added");
  }
}

app.post("/save", async (req, res) => {
  const newData = new TimeData(req.body);
  await newData.save();
  res.json({ message: "Saved" });
});
app.get("/reset", async (req, res) => {
  await TimeData.deleteMany({});

  await TimeData.insertMany([
    {
      site: "github.com",
      time: 30,
      category: "productive"
    },
    {
      site: "youtube.com",
      time: 20,
      category: "unproductive"
    },
    {
      site: "google.com",
      time: 10,
      category: "unproductive"
    }
  ]);

  res.send("Database Reset");
});
app.get("/data", async (req, res) => {
  const data = await TimeData.find();
  res.json(data);
});

mongoose.connection.once("open", async () => {
  await addSampleData();

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});