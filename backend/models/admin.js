import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   contraseña: {type:String, require:true},
   estado : {type: Boolean, default: true },
   createdat : {type: Date, default: Date.now}
  },
  {
    collection: 'Admin',
  }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
