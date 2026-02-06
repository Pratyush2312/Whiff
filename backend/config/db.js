import mongoose from "mongoose";

const conn=()=>{mongoose.connect("mongodb://localhost:27017/whiff")}

export default conn