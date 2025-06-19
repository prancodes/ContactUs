if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/getResponse", async (req, res) => {
  try {
    const data = await Contact.find({});
    res.json({
      message: "Here are all responses",
      data: data
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// server.js (after your other app.use calls)
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });

    const newResponse = await contact.save();
    // console.log(newResponse);
    res.json({
      message: "Thank you! Your message has been received.",
      data: newResponse
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
