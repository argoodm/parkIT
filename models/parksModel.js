import mongoose from "mongoose"
import { Schema } from "mongoose"


const parkSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    historyBlurb: {
        type: String,
        required:true,
    },
    recommendedSights: {
        type: Array,
        required: false
    },
    alerts: [
        {
        
            "url": String,
            "title": String,
            "parkCode": String,
            "description": String,
            "relatedRoadEvents": Array,
            "lastIndexedDate": String
        }
    ],

}, { timestamps: true })

export const Park = mongoose.model('park', parkSchema)

export { parkSchema }