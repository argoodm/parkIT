import mongoose, { mongo } from "mongoose"
import { Schema } from "mongoose"
import { boolean } from "webidl-conversions"


const userSchema = new Schema({
        "journal": [
            {
                "title": String,
                "entry": String,
                "tags": Array
            }
        ],
         
        "packingList": [
            {
                itemName: String,
                isChecked: Boolean
            }
        ],
    
        "parksVisited": [
            {
            parkName: String, 
            hasVisited: Boolean
        }
    ]
}, { timestamps: true });
    

export const User = mongoose.model('user', userSchema)

export { userSchema }