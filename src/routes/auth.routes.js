import expres from 'express';
import authController from '../controllers/auth.controller.js';

const router = expres.Router();

/* POST /api/auth/register */ 
router.post("/register",authController.userRegisterController); // Route for user registration

/* POST /api/auth/login */
router.post("/login",authController.userLoginController);

export default router; 