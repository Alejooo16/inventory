import { defineStore } from "pinia";
import axios from "axios";
import { local } from "../variable.js";
import { ref } from "vue";
 
export const useVentasStore = defineStore("ventas", () => {
  let lodin = ref(true);

  const pedirventas = async () => {
    try {
      lodin.value = false;
      return await axios.get(`${local}/venta`);
    } catch (error) {
      lodin.value = false;
      console.log(error);
    } finally {
      lodin.value = false;
    }
  };

  const agregarventa = async (info) => {
    try {
      return await axios.post(`${local}/venta`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const actualizarventa = async (id, nombre, descripcion, precio, cantidad) => {
    try {
      const res = await axios.put(`${local}/venta/${id}`, {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actuestado = async (id, estado) => {
    try {
      const res = await axios.put(`${local}/venta/estado/${id}`, {
        estado: estado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    agregarventa,
    pedirventas,
    actualizarventa,
    actuestado,
    lodin
  };
});
