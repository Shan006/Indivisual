const fs = require('fs');
const path = require('path');
const Sticker = require('../models/Sticker');

const addStickers = async (req,res) => {
  const folderPath = 'utils';

  try {
    const files = fs.readdirSync(folderPath);

    files.forEach(async (file) => {

      const sticker = new Sticker({fileName: file});
  
      await sticker.save();

    });

    res.status(201).json({message:"Stickers Uploaded Successfully"})

  } catch (error) {
    console.error('Error reading files:', error , error.stack);
    res.status(500).json(error)
  }
}
const deleteAll= async (req, res) => {
  try {
      await Sticker.deleteMany({}); // Delete all records from the Stickers collection
      res.status(200).json({ message: 'All records deleted successfully' });
  } catch (error) {
      console.error('Error deleting records:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
const getAllStickers = async (req, res) => {
  try {
    const stickers = await Sticker.find();

    res.status(200).json(stickers);
  } catch (error) {
    console.error('Error fetching stickers:', error);
    res.status(500).json({ message: 'Failed to fetch stickers' });
  }
};

module.exports = { addStickers , getAllStickers ,deleteAll};
