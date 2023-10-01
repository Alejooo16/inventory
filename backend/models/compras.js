import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   valor: {type:String, require:true},
   cantidad: {type:String, require:true},
   proveedor: {type: String, require:true},
   estado : {type: Boolean, default: true },
   createdat : {type: Date, default: Date.now}
  },
  {
    collection: 'Compras',
  }
);

const Compra = mongoose.model('Compras', compraSchema);
export default Compra;