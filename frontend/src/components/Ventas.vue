

<template>
    <div>
      <span class="subtitulo">INVENTARIO DE VENTAS</span>
  

      <div class="busco">
        <input v-model="buscado" type="text" placeholder="Buscar por nombre" />
      </div>
  
  
  <div class="table-container" >
      <table class="table">
    <thead>
      <tr>
                <th>Nombre del producto</th>
                <th>Valor unitario</th>
                <th>Cantidad-vendida</th>
                <th>Cliente</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(producto, index) in productosfiltrando" :key="index">
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.valor }}</td>
                <td>{{ producto.cantidad }}</td>
                <td>{{ producto.cliente }}</td>
              </tr>
  
    </tbody>
  </table>
  </div>
  
  

  

    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import {useVentasStore} from "../stores/ventas"
  
  let comprasarray = ref([]);
let buscado = ref("")

  const useventas = useVentasStore()
  
  // se ejecuta en el onMounted
  async function traecompras() {
    let cosa = await useventas.pedirventas();
    comprasarray.value = cosa.data;
  }

  
  
  
  let productosfiltrando = computed(() => {
    if (buscado.value === "") {
      traecompras();
    }
    let nombrebuscado = buscado.value;
    let resultados = comprasarray.value.filter((producto) =>
      producto.nombre.includes(nombrebuscado)
    );
    return resultados;
  });


  
  // propiedad que se encarga de ejecutar la funcion traecompras una ves se carga el componente
  onMounted(() => {
    traecompras();
  });
  </script>
  
  
  
  <style scoped>
  .subtitulo {
    font-size: 2.1rem;
    font-weight: 600;
    position: relative;
    left: 40%;
    top: 30px;
  }
  
  
  .table-container {
    max-height: 400px; /* Altura máxima antes de que aparezca el scroll */
    overflow-y: auto; /* Agregar un scroll vertical si es necesario */
  }
  
  
  /* Estilos para la tabla */
  table {
    width: 95%;
    position: relative;
    border-collapse: collapse;
    margin-bottom: 20px;
    left: 2.5%;
    
  }
  
  /* Estilos para los encabezados de la tabla */
  th {
    background-color: #000000;
    border: 2px solid #ffffff;
    text-align: center;
    padding: 8px;
    color: #dddddd;
  }
  
  /* Estilos para las celdas de la tabla */
  td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
  
  /* Estilos para las filas pares de la tabla */
  
  /* Estilos para el resaltado al pasar el mouse por una fila */
  tbody tr:hover {
    background-color: #1a4c973f;
  }
  
  
  .edi {
    width: 30px;
  }
  
  .btedi {
    top: -7px;
  }
  
  .lupa {
    width: 40px;
    height: 40px;
    position: relative;
    top: 5px;
  }
  
  .busco {
    display: flex;
    top: -10px;
    position: relative;
    margin: 40px;
  }
  
  .busco input {
    width: 250px;
    height: 40px;
    outline: none;
    font-size: 16px;
   
  }
  
  .busco input::placeholder {
    text-align: center;
  }
  
  .tabla {
    position: relative;
    right: 10px;
  }
  
  .tabla::-webkit-scrollbar {
    width: 5px;
  }
  
  .tabla::-webkit-scrollbar-thumb {
    background-color: #252966;
    border-radius: 20px;
  }
  
  .alerta {
    font-family: "Times New Roman", Times, serif;
    font-size: 17px;
    position: relative;
    bottom: -20px;
    color: red;
    font-weight: 100;
  }
  
  .modal-body {
    font-family: Arial, sans-serif;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .modal input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Estilos para el botón de Estado */
  .estado {
    margin-top: 15px;
  }
  
  .estado-buttons {
    display: flex;
  }
  
  .btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }
  
  
  </style>
  