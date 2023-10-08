import proveedores from '../models/proveedores.js';

export const obtenerproveedores = async (req, res) => {
  try {
    const proveedor = await proveedores.find();
    if (proveedor) {
      res.status(200).json(proveedor);
      
    } else {
      res.status(404).json({ error: 'proveedores no encontradas.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las proveedores.' });
  }
};



export const obtenerproveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await proveedores.findById(id);
    if (proveedor) {
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'proveedor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la proveedor.' });
  }
};






export const crearproveedor = async (req, res) => {
  try {
    const nuevaproveedor = new proveedores(req.body);
    const proveedorcreada = await nuevaproveedor.save();
    res.status(201).json(proveedorcreada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la proveedor' });
  }
};



export const actualizarproveedor = async (req, res) => {
  
  const id = req.params.id
  console.log(`proveedor actualizada ${id}`);

  const actualizado={
    proveedor:req.body.proveedor,
    cantidad:req.body.cantidad,
    telefono:req.body.telefono,
    nombreproducto:req.body.nombreproducto,
    valor:req.body.valor,
    estado:req.body.estado
  }
  
  try {
    const proveedorActualizado = await proveedores.findByIdAndUpdate(id, actualizado);
    
    if (proveedorActualizado) {
      console.log(proveedorActualizado);
      res.status(200).json(proveedorActualizado);
    } else {
      res.status(404).json({ error: 'proveedor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el proveedor.',error });
  }
};





export const eliminarproveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedorEliminada = await proveedores.findByIdAndDelete(id);
    if (proveedorEliminada) {
      res.status(200).json(proveedorEliminada);
    } else {
      res.status(404).json({ error: 'proveedor no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la proveedor.' });
  }
};





export const actualizarestado = async (req, res) => {

  const id = req.params.id
  console.log(`estado actualizado ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const proveedorActualizado = await proveedors.findByIdAndUpdate(id, actualizado);
    
    if (proveedorActualizado) {
      console.log(proveedorActualizado);
      res.status(200).json(proveedorActualizado);
    } else {
      res.status(404).json({ error: 'proveedor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el proveedor.',error });
  }

};