import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    }
},{timestamps:true})

const SubCategory = mongoose.model('SubCategory', subcategorySchema, "SubCategories");

export default SubCategory;