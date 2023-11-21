import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
},{timestamps:true});

const Category = mongoose.model('Category', categorySchema, 'Categories')

export default Category;