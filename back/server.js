const express = require("express");
const router = require("./routes/route");
const cors = require("cors");
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(5000, async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    console.log("Listening to port 5000...");
  }catch(err)
  {
    console.log(err.message)
  }
});
