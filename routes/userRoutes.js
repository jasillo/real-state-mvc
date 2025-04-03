import express from "express"
import {
    login,
    singupUser,
    verifyEmail,
    resetPwd,
    createNewPwd,
    registerValidator,
    loginValidator,
    emailValidator,
    pwdValidator
} from "../controllers/userController.js";

const router = express.Router();

router.get('/login', login);
router.post('/login', loginValidator, login);

router.get('/register', singupUser);
router.post('/register', registerValidator, singupUser);
router.get('/verify-email/:token', verifyEmail);

router.get('/recovery-password', resetPwd);
router.post('/recovery-password', emailValidator, resetPwd);
router.get('/reset-password/:token', createNewPwd);
router.post('/reset-password/:token', pwdValidator, createNewPwd);

export default router;