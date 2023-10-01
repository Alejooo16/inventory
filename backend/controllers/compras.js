import compras from '../models/compras.js';

export const obtenerCompras = async (req, res) => {
  try {
    const Compra = await compras.find();
    if (Compra) {
      res.status(200).json(Compra);
      
    } else {
      res.status(404).json({ error: 'Compras no encontradas.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las compras.' });
  }
};



export const obtenerCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const Compra = await compras.findById(id);
    if (Compra) {
      res.status(200).json(Compra);
    } else {
      res.status(404).json({ error: 'Compra no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la compra.' });
  }
};






export const crearCompra = async (req, res) => {
  try {
    const nuevaCompra = new compras(req.body);
    const Compracreada = await nuevaCompra.save();
    res.status(201).json(Compracreada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la Compra' });
  }
};



export const actualizarCompra = async (req, res) => {
  
  const id = req.params.id
  console.log(`Compra actualizada ${id}`);

  const actualizado={
    nombre:req.body.nombre,
    valor:req.body.valor,
    cantidad:req.body.cantidad,
    estado:req.body.estado
  } 
  
  try {
    const productoActualizado = await compras.findByIdAndUpdate(id, actualizado);
    
    if (productoActualizado) {
      console.log(productoActualizado);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el producto.',error });
  }
};





export const eliminarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const compraEliminada = await compras.findByIdAndDelete(id);
    if (compraEliminada) {
      res.status(200).json(compraEliminada);
    } else {
      res.status(404).json({ error: 'Compra no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la compra.' });
  }
};





export const actualizarestado = async (req, res) => {

  const id = req.params.id
  console.log(`estado actualizado ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const productoActualizado = await productos.findByIdAndUpdate(id, actualizado);
    
    if (productoActualizado) {
      console.log(productoActualizado);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el producto.',error });
  }

};