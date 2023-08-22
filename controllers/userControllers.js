import { User } from "../models/userModels.js"
import mongoose from "mongoose"




// create user 
const createUser = async(req, res) => {
    const {journal, packingList, parksVisited} = req.body
    
    try {
        const user = await User.create({
            journal, packingList, parksVisited})
            res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}


//create journal entry 

const createJournalEntry = async (req, res) => {
    const { id } = req.params;
    const { title, entry, tags } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.journal.push({ title, entry, tags });
      await user.save();
  
      res.status(201).json({ message: 'Journal entry created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const createpackingList = async (req, res) => {
    const { id } = req.params;
    const { key, value } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.journal.push({ key, value });
      await user.save();
  
      res.status(201).json({ message: 'packing list entry created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
// get all user 

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

// get journal entries 
const getJournal = async (req, res) => {
    const {id} = req.params;
    try {
      const user = await User.findById(id); // Retrieve a single user by ID
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const journal = user.journal
      res.status(200).json(journal);

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}



const getparksVisited = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id); // Retrieve a single user by ID
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const parksVisited = user.parksVisited
      res.status(200).json(parksVisited);

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}

//getpackingList

const getpackingList = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id); // Retrieve a single user by ID
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const packingLists = user.packingList; // Access the packingList property
      res.status(200).json(packingLists);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  

// get a single user 

const getUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }

    const user = await User.findById(id)

    res.status(200).json(user)

}


// update a user 
const updateUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({error: 'no such user'})
     }
    res.status(200).json(user)
}



const addItem = async (req, res) => {
    const { id } = req.params;
    const { itemName } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.packingList.set(itemName, false);
      await user.save();
      res.status(200).json({ message: 'Item added to packing list successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const updateItem = async (req, res) => {
  const {userId, itemId} = req.params
  const { isChecked } = req.body

  try {
    const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedList = user.packingList.maps(item => {
        if (item._id.toString() === itemId) {
          return {...item, isChecked}
        }
        return item;
      })

      user.packingList = updatedList
      await user.save()

      res.status(200).json({message: 'item checked!'})
  
} catch (error) {
  res.status(400).json({error: error.message})
}
}

const addParkToVisited = async (req, res) => {
    const { id } = req.params;
    const { parkName } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the park is already in the parksVisited array
      const existingPark = user.parksVisited.find(park => park.parkName === parkName);
      if (existingPark) {
        return res.status(400).json({ error: 'Park already exists in parksVisited' });
      }
  
      // Add the new park to the parksVisited array
      user.parksVisited.push({ parkName, hasVisited: false });
      await user.save();
  
      res.status(200).json({ message: 'Park added to visited' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const addItemToList = async (req, res) => {
    const { id } = req.params;
    const { itemName } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the park is already in the parksVisited array
      const existingItem = user.packingList.find(user => user.itemName === itemName);
      if (existingItem) {
        return res.status(400).json({ error: 'Park already exists in parksVisited' });
      }
  
      // Add the new park to the parksVisited array
      user.packingList.push({ itemName, hasVisited: false });
      await user.save();
  
      res.status(200).json({ message: 'Item added to list' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
//delete a user

const deleteUser = async (req, res) => {
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }

    const user = await User.findOneAndDelete({_id:id})
     if (!User) {
        return res.status(404).json({error: 'no such user'})
     }

     res.status(202).json(user)

}

const deleteJournalEntry = async (req, res) => {
    const { userId, entryId } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the journal entry to be deleted based on an identifier
        const entryIndex = user.journal.findIndex(entry => entry._id.toString() === entryId);

        if (entryIndex === -1) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        // Remove the entry from the journal array
        user.journal.splice(entryIndex, 1);

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getJournalEntry = async (req, res) => {
    const { userId, entryId } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const journalEntry = user.journal.id(entryId);

        if (journalEntry === -1) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({journalEntry});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



const updateJournalEntry = async (req, res) => {
    const { userId, entryId } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const journalEntry = user.journal.id(entryId)
        console.log(journalEntry)
        console.log(entryId)

        if (!journalEntry) {

            console.log(res.body)
            return res.status(404).json({ error: 'Journal entry not found' });
            
        }
        journalEntry.set(req.body);
        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Journal entry updated successfully' });
        console.log(res.body)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

    
export {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    getpackingList, getJournal, updateItem, getparksVisited, createJournalEntry, createpackingList, addItemToList, addParkToVisited, deleteJournalEntry, getJournalEntry, updateJournalEntry}