import mongoose from 'mongoose';

import bcrypt from 'bcryptjs'
const userSchema=new mongoose.Schema({


           username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            minlength:3
           },

           email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
           },
           password:{
            type:String,
            required:true,
            minlength:6
           },
           role:{
            type:String,
            default:'user',
            enum:["user","admin","manager"]
           }
},{timestamps:true});


 userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }
    try{
      
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        next();
    }catch(error){
        next(error);
    }
});


userSchema.methods.comparePassword=async function(pssword){

    const user=this;
    try{
        return await bcrypt.compare(pssword,user.password);
    }catch(error){
        console.error("Error comparing password:", error.message);
        throw new Error("Password comparison failed");
    }
}
const User=mongoose.model('User',userSchema);

export default User;