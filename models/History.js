import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const historySchema = new Schema({
    order : {
        type : Schema.Types.ObjectId,
        ref:"Order",
        required:true,
    },
    user : {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

const History = mongoose.model('History', historySchema,'History');

export default History;