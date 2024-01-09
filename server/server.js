const app = require("./app"); // Containing instance of express and all other imp info
require('dotenv').config(); // To store environment variable which changes with environment
const { connectDatabase } = require("./config/database"); // Function to connect with DB
const cloudinary = require("cloudinary"); // importing cloudinary

connectDatabase(); // To Connect to MONGODB Database.

// To Store images and other media
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Creating a server using the instance of express that we defined in the app.js
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
