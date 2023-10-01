import Admin from '../models/admin.js';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


function generartoken(id) {
  return jwt.sign(id, process.env.CLAVE)
}



export const loginadmin = async (req, res) => {
  try {
    const { nombre, contraseña} = req.body;

    const adminEncontrado = await Admin.findOne({ nombre });
    if (!adminEncontrado) {
      return res.json({ 
        msj: "Usuario no encontrado",
        status: "404"
      });
    }
  
   let id = adminEncontrado.id

   
    const contraseñaCoincide = bcryptjs.compareSync(contraseña, adminEncontrado.contraseña);
    if (!contraseñaCoincide) {
      return res.json({ 
        msj: "Contraseña incorrecta",
        status: "404" 
      });
    }
 
  let token = generartoken(id)


res.json({ 
  mensaje: "Inicio de sesión exitoso",
  usuario: adminEncontrado.nombre,
  iddeusuario: id,
  contraseña: adminEncontrado.contraseña,
  token: token,
  status: 200
});

  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
  }
};


export const obtenerAdmins= async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los admins.' });
  }
};


export const obtenerAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminn = await Admin.findById(id);
    if (adminn) {
      res.status(200).json(adminn);
    } else {
      res.status(404).json({ error: 'Admin no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el Admin.' });
  }
};


export const CrearAdmin = async (req, res) => {
  try {
    const nuevoAdmin = new Admin(req.body);
const salt = bcryptjs.genSaltSync()
nuevoAdmin.contraseña = bcryptjs.hashSync(req.body.contraseña, salt)
    const AdminCreado = await nuevoAdmin.save();
    res.status(201).json(AdminCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el Admin.' });
  }
};



export const ActualizarAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const AdminActualizado = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (AdminActualizado) {
      res.status(200).json(AdminActualizado);
    } else {
      res.status(404).json({ error: 'Admin no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el Admin.' });
  }
};

export const EliminarAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const AdminEliminado = await Admin.findByIdAndDelete(id);
    if (AdminEliminado) {
      res.status(200).json(AdminEliminado);
    } else {
      res.status(404).json({ error: 'Admin no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el Admin.' });
  }
};
