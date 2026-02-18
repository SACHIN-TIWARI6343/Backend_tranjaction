import expres from 'express';
import authController from '../controllers/auth.controller.js';

const router = expres.Router();

/* POST /api/auth/register */ 
router.post("/register",authController.userRegisterController); // Route for user registration

export default router; 