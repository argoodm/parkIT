import mongoose from "mongoose"
import { Schema } from "mongoose"

// const Schema = mongoose.Schema

const parkSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    historyBlurb: {
        type: String,
        required:true,
    },
    reccomendedSights: {
        type: Array,
        required :true
    },
    alerts: {
        type: Array, 
        required: true 
    }

}, { timestamps: true })

export const Park = mongoose.model('park', parkSchema)

export { parkSchema }