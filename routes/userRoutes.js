import express from "express"
import { loginForm, registerForm, recoveryPwdForm } from "../controllers/userController.js";

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.get('/recovery-password', recoveryPwdForm);

export default router;