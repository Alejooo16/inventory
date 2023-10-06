<template>
  <div>
    <span class="subtitulo">INVENTARIO DE COMPRAS</span>

    <div class="busco">
      <input v-model="buscado" type="text" placeholder="Buscar por nombre" />
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Valor unitario</th>
            <th>Cantidad-comprada</th>
            <th>Proveedor</th>
            <th>Fecha-compra</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productosfiltrando" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.valor }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>{{ producto.proveedor }}</td>
            <td>{{ producto.createdat }}</td>
            <td>
              <button
                type="button"
                class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="traer(producto)"
              >
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- modal editar -->

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="descripcion">nombre</label>
              <input
                autocomplete="off"
                type="text"
                v-model="nombremodel"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="descripcion">valor</label>
              <input
                autocomplete="off"
                type="text"
                v-model="valormodel"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="descripcion">cantidad</label>
              <input
                autocomplete="off"
                type="text"
                v-model="cantidadmodel"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="descripcion">proveedor</label>
              <input
                autocomplete="off"
                type="text"
                v-model="proveedormodel"
                class="form-control"
              />
            </div>

            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>


          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button @click="ediciondatos()" type="button" class="btn btn-dark">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script setup>
import { ref, onMounted, computed } from "vue";
import { useComprasStore } from "../stores/compras";

let comprasarray = ref([]);
let buscado = ref("");

const usecompras = useComprasStore();

// se ejecuta en el onMounted
async function traecompras() {
  let cosa = await usecompras.pedircompras();
  comprasarray.value = cosa.data;
}

let nombremodel = ref("");
let valormodel = ref("");
let cantidadmodel = ref("");
let proveedormodel = ref("");
let idnecesario = ref("");

function traer(producto) {
  idnecesario.value = producto._id;
  nombremodel.value = producto.nombre;
  valormodel.value = producto.valor;
  cantidadmodel.value = producto.cantidad;
  proveedormodel.value = producto.proveedor;
}

let validacion = ref(false);
async function ediciondatos() {
  if (validacionesedicion() == true) {
    const a = await usecompras.actualizarcompra(
      idnecesario.value,
      nombremodel.value,
      valormodel.value,
      cantidadmodel.value,
      proveedormodel.value
    );

   await traecompras();
    limpiar();
    setTimeout(() => {
      validacion.value = false;
    }, 1000);
  }
}

function limpiar() {
  nombremodel.value = "";
  valormodel.value = "";
  cantidadmodel.value = "";
  proveedormodel.value = "";
}

let alerta_v = ref("");
function validacionesedicion() {
  console.log("ok");
  validacion.value = false;
  if (!nombremodel.value) {
    alerta_v.value = "El nombre es obligatorio";
  } else if (!valormodel.value) {
    alerta_v.value = "El valor es obligatorio";
  } else if (!cantidadmodel.value) {
    alerta_v.value = "La cantidad es obligatoria";
  } else if (!proveedormodel.value) {
    alerta_v.value = "El proveedor es obligatorio";
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
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
  