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
        "packingList": {
            type: Map,
            of: Boolean,
          },
        "parksVisited": {
            type: Map, 
            of: Boolean
        }
}, { timestamps: true });
    

export const User = mongoose.model('user', userSchema)

export { userSchema }