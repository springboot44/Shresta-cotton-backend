
import express from 'express';


const router=express.Router();





// only admin can acess this router

router.get('/admin',(req,res)=>{
    res.status(200).json({message: "Welcome to the admin route"});
})


// only manager can acess this router
router.get('/manager',(req,res)=>{
    res.status(200).json({message: "Welcome to the manager route"});
})


// only user can acess this router
router.get('/user',(req,res)=>{
    res.status(200).json({message: "Welcome to the user route"});
})


export default router;