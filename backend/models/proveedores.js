import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema(
  {
   proveedor: {type: String, require:true},
   cantidad: {type:String, require:true},
   telefono: {type: String, require:true},
   nombreproducto: { type:String, require:true,},
   valor: {type:String, require:true},
   estado : {type: Boolean, default: true },
   createdat : {type: Date, default: Date.now}
  },
  {
    collection: 'Proveedor',
  }
);

const Compra = mongoose.model('Proveedor', compraSchema);
export default Compra;
