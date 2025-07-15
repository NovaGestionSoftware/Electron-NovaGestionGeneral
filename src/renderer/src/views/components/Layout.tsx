import { useEffect, useState } from "react";
import RegistrarView from "../app/registrar/RegistrarView";
import PortalView from "../app/PortalView";
import { ModalProvider } from "@renderer/frontend-resources/electron/components/Modales/context/ModalContext";
import logoNova from "@renderer/frontend-resources/assets/logos/novaIcon.png";

export default function Portal() {
  const [mode, setMode] = useState<"loading" | "registrar" | "login">("loading");
  const [empresaID, setEmpresaID] = useState<string | null>(null);

  useEffect(() => {
    const ipc = window.electron?.ipcRenderer;
    if (!ipc) return;

    ipc.invoke("get-initial-mode").then(({ mode, empresaID }) => {
      setMode(mode);
      setEmpresaID(empresaID);
    });

    const onRegistrar = () => {
      setMode("registrar");
      setEmpresaID(null);
    };

    const onLogin = (_e: unknown, id: string) => {
      setMode("login");
      setEmpresaID(id ?? null);
    };

    ipc.on("show-registrar", onRegistrar);
    ipc.on("show-login", onLogin);

    return () => {
      ipc.removeListener("show-registrar", onRegistrar);
      ipc.removeListener("show-login", onLogin);
    };
  }, []);

  return (
    <ModalProvider>
      <div className="flex items-center justify-center h-screen bg-portal">
        <div className="flex flex-col w-full min-h-screen items-center justify-center select-none">
          <div className="flex flex-col items-center translate-y-[-20%] xl:translate-y-[-40%]">
            <img
              alt="logo"
              className="w-[15rem] xl:w-[20rem] max-w-xs transition-all duration-500 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:filter"
              src={logoNova}
              draggable="false"
            />
            <p className="text-2xl xl:text-3xl font-semibold text-slate-200">
              Sistema Integrado de Gestión y Administración
            </p>
          </div>

          {/* {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Marcas"
          modalId={modalId}
          activeModalId={activeModalId}
          setActiveModalId={setActiveModalId}
        >
          <MarcasView />
        </Modal>
      )} */}
        </div>
        {mode === "loading" ? <p></p> : mode === "registrar" ? <RegistrarView /> : <PortalView />}
      </div>
    </ModalProvider>
  );
}
