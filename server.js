
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import app from './src/app.js'; // Import the Express app
import connectDB from './src/config/db.js'; // Import the database connection function

const port = process.env.PORT ; // Use the PORT environment variable or default to 3000


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connectDB(); // Connect to the database before starting the server 

