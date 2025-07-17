import axios from "axios";

const api = axios.create({
  baseURL: "https://apiphp.novagestion.com.ar/apinovades/electron",
});

export async function obtieneUsuariosEmpresa(empresaID) {
  try {
    const response = await api.get(`/obtieneEmpresasUsu.php?_d={"_e":"${empresaID}"}`);

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

export async function loginEmpresa(formData) {
  try {
    const { data } = await api.post("/login_empresa", formData);

    return data;
  } catch (error) {
    console.log("❌ Error en loginEmpresa:", error);
    throw error; // 🔥 Esto activa onError en useMutation
  }
}
