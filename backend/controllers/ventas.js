import ventas from '../models/ventas.js';

export const obtenerVentas = async (req, res) => {
  try {
    const Ventas = await ventas.find();
    if (Ventas) {
      res.status(200).json(Ventas);
      
    } else {
      res.status(404).json({ error: 'Productos no encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los productos.' });
  }
};



export const obtenerVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const Ventas = await ventas.findById(id);
    if (Ventas) {
      res.status(200).json(Ventas);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el Producto.' });
  }
};






export const crearVenta = async (req, res) => {
  try {
    const nuevoVenta = new ventas(req.body);
    const Ventacreada = await nuevoVenta.save();
    res.status(201).json(Ventacreada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el Producto' });
  }
};









export const actualizarVenta = async (req, res) => {
  const id = req.params.id
  console.log(`Venta actualizado ${id}`);

  const actualizado={
    nombre:req.body.nombre,
    valor:req.body.valor,
    cantidad:req.body.cantidad,
    cliente:req.body.cliente
  } 
  
  try {
    const ventaActualizada = await ventas.findByIdAndUpdate(id, actualizado);
    
    if (ventaActualizada) {
      console.log(ventaActualizada);
      res.status(200).json(ventaActualizada);
    } else {
      res.status(404).json({ error: 'Venta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la venta.',error });
  }
};





export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const ventaEliminada = await ventas.findByIdAndDelete(id);
    if (ventaEliminada) {
      res.status(200).json(ventaEliminada);
    } else {
      res.status(404).json({ error: 'venta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la venta.' });
  }
};





export const actualizarestado = async (req, res) => {

  const id = req.params.id
  console.log(`estado actualizado ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const productoActualizado = await ventas.findByIdAndUpdate(id, actualizado);
    
    if (productoActualizado) {
      console.log(productoActualizado);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Venta no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la venta.',error });
  }

};