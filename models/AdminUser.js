import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
},{timestamps:true})

const Admin = mongoose.model('Admin',adminSchema,'Admin');

export default Admin;