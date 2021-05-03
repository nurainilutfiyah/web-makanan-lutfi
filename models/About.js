const mongoose = require("mongoose");

const schema = mongoose.Schema({
    judul: String,
    isi: String,
});

module.exports = mongoose.model("About", schema);