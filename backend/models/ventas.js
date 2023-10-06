import mongoose from 'mongoose';

const ventasSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   valor: {type:String, require:true},
   cantidad: {type:String, require:true},
   cliente: {type:String, require:true},
   estado : {type: Boolean, default:true },
   createdat : {type: Date, default: Date.now}
  },
  {
    collection: 'Ventas', 
  }
);

const Venta = mongoose.model('Ventas', ventasSchema);
export default Venta;