require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors")


const port = 8006;

app.use(express.json());
app.use(
  cors({
    origin: "https://contact-form-eta-beryl.vercel.app",
    methods: "POST , GET",
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);
app.use(router);

app.listen(port, ()=>{
    console.log(`server start at port no:${port}`)
})