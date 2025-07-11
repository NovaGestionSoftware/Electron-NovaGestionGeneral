import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { useState } from "react";

export default function RegistrarView() {
  const [licenciaNueva, setLicenciaNueva] = useState(true);
  const [cambioEquipo, setCambioEquipo] = useState(false);
  const [empresaID, setEmpresaID] = useState("");
  const handleClose = () => {};

  const registrar = () => {
    if (!empresaID.trim())
      return window?.electron?.ipcRenderer?.invoke("show-native-alert", {
        type: "error",
        title: "Sistema de Ventas",
        message: "Ingresa un número válido.",
      });
    window.electron.ipcRenderer.send("registrar-empresa", empresaID);
    return;
  };

  return (
    <DraggableModal title="Registro Sistema" onClose={handleClose} width="720px">
      <div className="max-w-3xl mx-auto p-2 xl:p-4 bg-gray-200 rounded-b">
        {/* Título */}
        {/* <h2 className="text-lg font-bold text-red-600 mb-4">Registro Sistema</h2> */}

        {/* Licencia Nueva */}
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={licenciaNueva}
              onChange={() => setLicenciaNueva(!licenciaNueva)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium">Licencia Nueva</span>
          </label>
          <section className="border rounded-md bg-gray-50 px-4 pt-2 pb-3 mb-6 space-y-2">
            <div className="w-full text-center text-sm text-gray-500 italic">
              (Debe coincidir con los datos de serie)
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex w-full gap-2">
                <div className="flex flex-col w-full">
                  <span className="text-sm mb-1">Razón Social</span>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <span className="text-sm mb-1">CUIT</span>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:col-span-2">
                <span className="text-sm mb-1">Cond. Trib.</span>
                <select
                  defaultValue="Responsable Inscripto"
                  className="max-w-[12rem] border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Responsable Inscripto</option>
                  <option>Monotributista</option>
                  <option>Exento</option>
                </select>
              </div>

              <div className="flex flex-col min-w-md">
                <div className="flex justify-between w-full">
                  <span className="text-sm mb-1"> Nro. Serie</span>
                  <span className="text-sm text-gray-500 italic">(se recomienda copiar y pegar)</span>
                </div>
                <textarea className="border border-gray-300 rounded px-2 py-1 h-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </section>
        </div>

        {/* Licencia Vigente (Cambio de Equipo) */}
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={cambioEquipo}
              onChange={() => setCambioEquipo(!cambioEquipo)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium">Licencia Vigente (Cambio de Equipo)</span>
          </label>
          <section className="border rounded-md bg-gray-50 p-4 mb-2 space-y-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm mb-1">Nro. Empresa</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={empresaID}
                  onChange={(e) => setEmpresaID(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm mb-1">Nodo</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm mb-1">
                  Nro. Serie <span className="text-xs text-gray-500">(se recomienda copiar y pegar)</span>
                </span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer"
            onClick={registrar}
          >
            Verificar
          </button>
          <button className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300">BD</button>
          <button className="px-4 py-2 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600">Limpiar</button>
          <button className="px-4 py-2 rounded bg-gray-400 text-white text-sm cursor-not-allowed" disabled>
            Grabar
          </button>
        </div>
      </div>
    </DraggableModal>
  );
}
