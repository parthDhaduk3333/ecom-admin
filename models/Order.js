import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    product: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }, size: {
            type: String,
            required: true
        }, item : {
            type:Number,
            required:true,
            default:1
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema, 'Orders');

export default Order;