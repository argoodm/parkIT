import express from "express"
import mongoose from "mongoose"
import { Park } from "../models/parksModel.js"
import { parkSchema } from "../models/parksModel.js"
import { createPark,
    getPark,
    getParks,
    deletePark,
    updatePark
 } from "../controllers/parkController.js"


const router = express.Router()


router.get('/parks', getParks)


router.get('/parks/:id', getPark)


router.post('/parks', createPark)

// delete a park by ID 

router.delete('/parks/:id', deletePark)


// patch route for a park 

router.patch('/parks/:id', updatePark)

export default router
