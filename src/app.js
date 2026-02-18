import express from "express"; // import express module
import authRoutes from "./routes/auth.routes.js"; // import authentication routes

const app = express(); // instance of express application

app.use(express.json()); // middleware to parse JSON request bodies
app.use("/api/auth",authRoutes); // use authentication routes


export default app; // export the app instance for use in other files