const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
mongoose

    .connect(
        "mongodb+srv://lutfi:projectmongo@cluster0.x1ngz.mongodb.net/uts_frontend?retryWrites=true&w=majority", { useNewUrlParser: true }
    )
    .then(() => {
        const app = express();
        app.use(express.static(path.join(__dirname, "public")));
        app.use(express.json()); // new
        app.use("/uts", routes);
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });