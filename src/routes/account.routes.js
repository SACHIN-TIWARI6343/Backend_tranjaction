import express from "express";

const router = express.Router();

import accountController from "../controllers/account.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

/* account creation route */
router.post("/create-account",authMiddleware,accountController.createAccountController);


export default router;