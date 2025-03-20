import express from "express"
import { loginForm, registerForm } from "../controllers/userController.js";

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);

export default router;