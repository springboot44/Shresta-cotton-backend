import express from 'express';
import { addcotton, getcotton, todaycotton, deletecotton } from '../controllers/CottonController.js';
import verifyToken, { isAdmin } from '../middleware/AuthMiddleWare.js'; // Ensure correct import

const router = express.Router();

// Only Admins can ADD
router.post('/addcotton', verifyToken, isAdmin, addcotton);

// Only Admins can DELETE
router.delete('/deletecotton/:id', verifyToken, isAdmin, deletecotton);

// Everyone (logged in) can GET
router.get('/getcotton',  getcotton);
router.get('/todaycotton', todaycotton);

export default router;