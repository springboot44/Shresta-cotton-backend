
import User from './../models/User.js';
import  generateToken  from './../jwt/jwttoken.js';
const register=async(req,res)=>{

    try{
        const {username,email,password,role}=req.body;

         if(!email || !password || !username){
            return res.status(400).json({message: "Email and password are required"});
        }
        const existuser=await User.findOne({email});
        if(existuser){
            return res.status(400).json({message: "User already exists"});
        }
        const user=new User({email,password,role,username});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Internal server error",error:error.message});
    }
}

const login=async(req,res)=>{ 
       const {email,password}=req.body;
       
     try {
        
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }
    const user=await User.findOne({email});

     if(!user){
        return res.status(404).json({message: "User not found"});
     }

     const isMatch=await user.comparePassword(password);
     if(!isMatch){
        return res.status(401).json({message: "Invalid credentials"});
     }

     const token=generateToken(user);
     console.log(user);
     res.status(200).json({message: "Login successful",user:user,token:token});
     } catch (error) {
        console.error("Login failed:", error.message);
        res.status(500).json({message: "Internal server error", error:error.message});
     }
      
     
}


export {register,login};