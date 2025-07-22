import { create } from "zustand";

// Función para generar un ID único si no se pasa ningún modalId
const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

const useStoreTemplate = (storeId: string) =>
  create<any>()((set) => ({
    planDePago: "",
    setPlanDePago: (data) => set({ planDePago: data }),

    dataParaTabla: [],
    setDataParaTabla: (updater) =>
      set((state) => ({
        dataParaTabla: typeof updater === "function" ? (updater as (prev: any) => any)(state.dataParaTabla) : updater,
      })),
    // Método de reset
    resetNotaPedidoStore: () =>
      set({
        planDePago: "",
        setDataParaTabla: [],
      }),
  }));

// Creamos un mapa para guardar las instancias de los stores
const storesMap = new Map<string, ReturnType<typeof useStoreTemplate>>();

// Función para obtener o crear un store basado en un ID
export const getUseStoreTemplate = (storeId?: string) => {
  const id = storeId || generateUniqueId();

  if (!storesMap.has(id)) {
    storesMap.set(id, useStoreTemplate(id));
  }

  return {
    store: storesMap.get(id)!,
    storeId: id,
  };
};

// Exportamos el store por defecto con un ID único (para compatibilidad)
const defaultStore = useStoreTemplate("default");
export default defaultStore;
