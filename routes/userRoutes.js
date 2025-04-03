import express from "express"
import {
    loginForm,
    singupUser,
    verifyEmail,
    resetPwd,
    createNewPwd,
    registerValidator,
    emailValidator,
    pwdValidator
} from "../controllers/userController.js";

const router = express.Router();

router.get('/login', loginForm);

router.get('/register', singupUser);
router.post('/register', registerValidator, singupUser);
router.get('/verify-email/:token', verifyEmail);

router.get('/recovery-password', resetPwd);
router.post('/recovery-password', emailValidator, resetPwd);
router.get('/reset-password/:token', createNewPwd);
router.post('/reset-password/:token', pwdValidator, createNewPwd);

export default router;