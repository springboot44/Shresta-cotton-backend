import express from 'express';
import { addcotton, getcotton, todaycotton, deletecotton } from '../controllers/CottonController.js';
import verifyToken from '../middleware/AuthMiddleWare.js';
import authorizeRoles from '../middleware/authorizeRoles.js'; // Import your new middleware

const router = express.Router();

// --- ADMIN ONLY ROUTES ---
// Only users with the 'admin' role can access these
router.post('/addcotton', verifyToken, authorizeRoles('admin'), addcotton);
router.delete('/delete/:id', verifyToken, authorizeRoles('admin'), deletecotton);

// --- SHARED ROUTES ---
// Both 'admin' and 'user' can view these
router.get('/getcotton',  getcotton);
router.get('/todaycotton', todaycotton);

export default router;