import {Schema, model, models} from 'mongoose';

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    mediaUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})

const product = models.products || model('products', productSchema);

export default product;