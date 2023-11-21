import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    OriginalPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    thumb: {
        type: String,
        required: true
    },
    thumb2: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    soldout: {
        type: Boolean,
        required: true,
        default: false
    },
    new:{
        type:Boolean,
        required:true,
        default:false
    },
    populer:{
        type:Boolean,
        default:false,
        required:true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema, "Products");

export default Product;