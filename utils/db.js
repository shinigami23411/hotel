const mongoose = require('mongoose');

const connect = async () => {
  try {
    // FIX 1: The MongoDB connection string was incomplete and in the wrong place.
    // It should be the first argument to mongoose.connect.
    // FIX 2: The options object was also misplaced.
    await mongoose.connect('mongodb+srv://marshmellow:MELLOWmarsh@cluster0.7ezorkz.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // FIX 3: This console.log was printing the connection string and options
    // as a separate argument, which is not what you want here.
    // It should just confirm the successful connection.
    console.log('Connected to MongoDB'); 
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = { connect };
