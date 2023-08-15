import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv"
import parks from "./api/parks.route.js"
import users from "./api/users.routes.js"
// const express = require('express')
const app = express();

dotenv.config();

mongoose.connect(process.env.PARKIT_DB_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log("Node API app is running on port 3000")
        })
    })
    .catch((error) => {
        console.log(error)
    })


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})


app.use("/api/v1", parks)
app.use("/api/v1", users);
app.use("*", (req, res) => res.status(404).json({error: "not found hi hi hi"}));




export default app 