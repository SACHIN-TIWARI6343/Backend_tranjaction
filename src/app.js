import express from "express"; // import express module
import authRoutes from "./routes/auth.routes.js"; // import authentication routes
import accountRoutes from "./routes/account.routes.js"; // import account routes
import cookieParser from "cookie-parser";

const app = express(); // instance of express application

app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookieParser()); // middleware to parse cookies
app.use("/api/auth",authRoutes); // use authentication routes
app.use("/api/accounts", accountRoutes); // use account routes


export default app; // export the app instance for use in other files