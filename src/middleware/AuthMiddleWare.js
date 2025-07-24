
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken=(req,res,next)=>{


     const token=req.headers.authorization || req.headers.Authorization ;

     if(!token){
         return res.status(401).json({message: "No token provided"});
     }

     if(!token.startsWith('Bearer ')){
         return res.status(401).json({message: "Invalid token format"});
     }

     const tokenValue=token.split(' ')[1];

     jwt.verify(tokenValue,process.env.JWT_SECRET,(err,decoded)=>{
         if(err){
             return res.status(401).json({message: "Invalid token"});
         }
         req.user=decoded;
         next();
     })
}

export default verifyToken;