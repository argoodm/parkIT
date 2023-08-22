import { Park } from "../models/parksModel.js"
import mongoose from "mongoose"
import * as dotenv from "dotenv"


dotenv.config()

const apiKey = process.env.NPS_API_KEY

const fetchParkCodeFromNPS = async (fullName) => {
  try {
    
    ; // Make sure your API key is loaded from .env

    const apiUrl = `https://developer.nps.gov/api/v1/parks?q=${fullName}&api_key=${apiKey}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Error fetching park code from NPS API')
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].parkCode;
    } else {
      throw new Error('Park not found in NPS API response')
    }
  } catch (error) {
    console.error('Error fetching park code from NPS API:', error.message)
    return null
  }
}

const fetchAlertsFromNPS = async (parkCode) => {


    try {
    
       
      const response = await fetch(` https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=${apiKey}`)
      const data = await response.json()
      return data.data

    } catch (error) {
      throw new Error('Error fetching alerts from NPS API: ' + error.message)
    }
  }


const createPark = async (req, res) => {
    const { name, historyBlurb, recommendedSights } = req.body
  
    try {
        const parkCode = await fetchParkCodeFromNPS(name)

        if (!parkCode) {
          return res.status(404).json({ error: 'Park not found in NPS database' })
        }
        
        const npsAlerts = await fetchAlertsFromNPS(parkCode)

        const park = await Park.create({
            name, historyBlurb, recommendedSights, parkCode, alerts: npsAlerts
        })
        
        res.status(200).json(park)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getParks = async (req, res) => {
    const parks = await Park.find({}).sort({createdAt: -1})
    res.status(200).json(parks)
}
// get a single park 

const getPark = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }

    const park = await Park.findById(id)

    res.status(200).json(park)

}

// get alerts


// const get/post/patchAlerts = async( req, res ) => {
//     // name or id request parameter
//     // (name becasue the parks? query selector)
//     // validate ID
//     // const name = name 
//     // const alerts = parks.alerts
//     // const parks.alerts. await(/ fetch 'https://developer.nps.gov/api/v1/parks?parkCode=acad')

//     // catch
//     // error message 
// curl 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE' 
// }
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