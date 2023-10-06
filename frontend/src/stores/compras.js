import { defineStore } from "pinia";
import axios from "axios";
import { local } from "../variable.js";
import { ref } from "vue";

export const useComprasStore = defineStore("compras", () => {
  let lodin = ref(true);

  const pedircompras = async () => {
    try {
      lodin.value = false;
      return await axios.get(`${local}/compra`);
    } catch (error) {
      lodin.value = false;
      console.log(error);
    } finally {
      lodin.value = false;
    }
  };

  const agregarcompra = async (info) => {
    try {
      return await axios.post(`${local}/compra`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const actualizarcompra = async (id, nombre, valor, cantidad, proveedor) => {
    try {
      const res = await axios.put(`${local}/compra/${id}`, {
        nombre: nombre,
        valor: valor,
        cantidad: cantidad,
        proveedor: proveedor
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actuestado = async (id, estado) => {
    try {
      const res = await axios.put(`${local}/compra/estado/${id}`, {
        estado: estado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    agregarcompra,
    pedircompras,
    actualizarcompra,
    actuestado,
    lodin
  };
});
