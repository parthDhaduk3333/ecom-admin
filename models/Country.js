import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name:{
        type: 'string',
        required: true,
    },
    charge: {
        type:String,
        required:true
    }
})

const Country = mongoose.model('Country',countrySchema,'Countries')

export default Country