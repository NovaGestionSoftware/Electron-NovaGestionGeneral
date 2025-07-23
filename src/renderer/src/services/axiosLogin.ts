import { LoginFormData } from "@renderer/types/types";
import axios from "axios";

const api = axios.create({
  baseURL: "https://apiphp.novagestion.com.ar/apinovades/electron",
});

export async function obtieneUsuariosEmpresa(empresaID: string) {
  try {
    const response = await api.get(`/obtieneEmpresasUsu.php?_d={"_e":"${empresaID}"}`);
    //console.log(empresaID);

    return { ...response.data };
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    window?.electron?.ipcRenderer?.invoke("show-native-alert", {
      type: "error",
      title: "Sistema de Ventas",
      message: "Error al obtener usuarios.",
    });
    throw error;
  }
}

export async function loginEmpresa(formData: LoginFormData) {
  try {
    const response = await api.get(
      `/loginEmpresaSis.php?_i={"_e":"${formData.empresa}","_m":"homo","_s":"10","_u":"${formData.usuario}","_p":"${formData.password}"}`,
    );

    console.log(formData);

    const data = response.data.data;
    if (!data || Object.keys(data).length === 0) {
      throw new Error("El objeto de datos está vacío");
    }

    return { ...data };
  } catch (error) {
    console.log("❌ Error en loginEmpresa:", error);
    throw error; // 🔥 Esto activa onError en useMutation
  }
}
