// Importing the Mongoose library
import mongoose from 'mongoose';

// Function to establish a connection to the MongoDB database
async function connectDB() {
  // Check if a connection is already established
  if (mongoose.connections[0].readyState) {
    // If a connection is already established, reuse it
    console.log('Existing connection available');
    return;
  }

  // MongoDB connection URI with credentials and database name
  const MONGO_URI = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@databasemain.gri3c4e.mongodb.net/paperbot?retryWrites=true&w=majority`;

  try {
    // Attempt to connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    // Handle connection errors
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the Node.js process on connection error
  }
}

// Function to disconnect from the MongoDB database
async function disconnectDB() {
  // Check if a connection is already established
  if (mongoose.connections[0].readyState) {
    // If connected, disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Exporting the connectDB and disconnectDB functions
export { connectDB, disconnectDB };
