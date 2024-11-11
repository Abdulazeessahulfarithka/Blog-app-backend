import mongoose from "mongoose";
const db=async()=>{
    try{
   const con =await mongoose.connect(process.env.MONGO_URI)
   console.log("mongodb is connected")
    }catch(error){
     console.log("error")
    }
}
export default db