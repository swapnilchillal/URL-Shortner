const mongoose = require("mongoose");

const urls = new mongoose.Schema({
  originalUrl: {
    type:String,
    required:true,
    trim:true,
  },
  counter:{
    type:Number,
  },
  shortUrl: {
    type:String,
    required:true,
  }
});

module.exports = mongoose.model("url", urls)