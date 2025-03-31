import express from "express"
import {
    loginForm,
    registerForm,
    recoveryPwdForm,
    singupUser,
    verifyEmail,
    registerValidator
} from "../controllers/userController.js";

const router = express.Router();

router.get('/login', loginForm);

router.get('/register', registerForm);
router.post('/register', registerValidator, singupUser);
router.get('/verify-email/:token', verifyEmail);

router.get('/recovery-password', recoveryPwdForm);

export default router;