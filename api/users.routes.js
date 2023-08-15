import express from "express"
import mongoose from "mongoose"
import { User } from "../models/userModels.js"
import { userSchema } from "../models/userModels.js"
import { createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    getpackingList, 
    getJournal, getparksVisited, createJournalEntry, createpackingList, addItem, addPark, deleteJournalEntry, getJournalEntry, updateJournalEntry
 } from "../controllers/userControllers.js"


const router = express.Router()

router.post('/user', createUser)

router.post('/user/:id/journal', createJournalEntry)

// router.post('/user/:id/list', createpackingList)

router.get('/user', getUsers)

router.get('/user/:id', getUser)

router.get('/user/:id/journal', getJournal)

router.get('/user/:id/parksvisited', getparksVisited)

router.get('/user/:id/list', getpackingList)
router.get('/user/:userId/journal/:entryId', getJournalEntry)

router.patch('/user/:id/list', addItem)

router.patch('/user/:id/parksvisited', addPark)

router.patch('/user/:userId/journal/:entryId', updateJournalEntry)



// delete a user by ID 

router.delete('/user/:id', deleteUser)
router.delete('/user/:userId/journal/:entryId', deleteJournalEntry)


// patch route for a user 

router.patch('/user/:id', updateUser)

export default router
