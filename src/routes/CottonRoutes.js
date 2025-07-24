import express from 'express';
import { addcotton, getcotton ,todaycotton} from '../controllers/CottonController.js';
import verifyToken from '../middleware/AuthMiddleWare.js';




const router = express.Router();

router.post('/addcotton',verifyToken, addcotton);

router.get('/getcotton', getcotton);

router.get('/todaycotton',todaycotton);

export default router;
