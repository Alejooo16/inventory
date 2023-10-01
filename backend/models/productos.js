import mongoose from 'mongoose';


const productosSchema = new mongoose.Schema({
    nombre : {type : String, required: true},
    descripcion: { type: String, required: true },
    precio: {type: String, required: true},
    cantidad: {type: String, required:true },
    estado : {type : Boolean ,default: true  },
    fecha_creacion : { type: Date, default: Date.now }
},
{collection : 'Productos'});


const Productos = mongoose.model('productos', productosSchema)

export default Productos;


