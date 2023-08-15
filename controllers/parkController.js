import { Park } from "../models/parksModel.js"
import mongoose from "mongoose"

//create a new park 
const createPark = async(req, res) => {
    const {name, historyBlurb, reccomendedSights, alerts} = req.body
    
    try {
        const park = await Park.create({
            name, historyBlurb, reccomendedSights, alerts})
            res.status(200).json(park)
    } catch (error) {
        res.status(400).json({error: error.message})

    }

    res.json({mssg: 'post a new park'})
}

// get all workout 

const getParks = async (req, res) => {
    const parks = await Park.find({}).sort({createdAt: -1})
    res.status(200).json(parks)
}
// get a single workout 

const getPark = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }

    const park = await Park.findById(id)

    res.status(200).json(park)

}




//delete a workout 

const deletePark = async (req, res) => {
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such park'})
    }

    const park = await Park.findOneAndDelete({_id:id})
     if (!park) {
        return res.status(404).json({error: 'no such park'})
     }

     res.status(202).json(park)

}

// update a workout 
const updatePark = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }
    const park = await Park.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!park) {
        return res.status(404).json({error: 'no such park'})
     }
    res.status(200).json(park)
}

export {
    createPark,
    getPark,
    getParks,
    deletePark,
    updatePark}