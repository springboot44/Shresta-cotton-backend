
import express from 'express';

const {register,login} = await import ('./../controllers/AuthController.js');

const router=express.Router();


router.post('/register',register);

router.post('/login',login);

export default router;