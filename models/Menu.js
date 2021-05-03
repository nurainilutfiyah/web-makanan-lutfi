const mongoose = require("mongoose");

const schema = mongoose.Schema({
    nama: String,
    detail: String,
    harga: String,
    gambar: String,
});

module.exports = mongoose.model("Menu", schema);