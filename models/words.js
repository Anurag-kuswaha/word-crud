const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {word: {
    type: String,
    unique:true,
    default: false,
  }
});
const Words = new mongoose.model("words", wordSchema);
module.exports = Words;
