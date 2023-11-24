import mongoose, {model, Schema, models} from "mongoose";

const ProductoSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
}, {
  timestamps: true,
});

export const Producto = models.Producto || model('Producto', ProductoSchema);