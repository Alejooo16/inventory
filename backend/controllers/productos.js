import productos from '../models/productos.js';

export const obtenerProductos = async (req, res) => {
  try {
    const Producto = await productos.find();
    if (Producto) {
      res.status(200).json(Producto);
      
    } else {
      res.status(404).json({ error: 'Productos no encontrados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los productos.' });
  }
};



export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const Producto = await productos.findById(id);
    if (Producto) {
      res.status(200).json(Producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el Producto.' });
  }
};






export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new productos(req.body);
    const Productocreado = await nuevoProducto.save();
    res.status(201).json(Productocreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el Producto' });
  }
};









export const actualizarProducto = async (req, res) => {
  
  const id = req.params.id
  console.log(`producto actualizado ${id}`);

  const actualizado={
    nombre:req.body.nombre,
    descripcion:req.body.descripcion,
    precio:req.body.precio,
    cantidad:req.body.cantidad,
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





export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await productos.findByIdAndDelete(id);
    if (productoEliminado) {
      res.status(200).json(productoEliminado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el producto.' });
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