import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartController = new Schema({
    product: {
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})

const Cart = mongoose.model('Cart', cartController, 'Cart');

export default Cart;