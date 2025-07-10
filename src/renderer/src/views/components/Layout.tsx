import { useEffect, useState } from "react";
import RegistrarView from "../app/registrar/RegistrarView";
import PortalView from "../app/PortalView";
import { ModalProvider } from "@renderer/frontend-resources/electron/components/Modales/context/ModalContext";
import LoadingComponent from "@renderer/frontend-resources/electron/components/Loading/LoadingComponent";

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
        {mode === "loading" ? <p></p> : mode === "registrar" ? <RegistrarView /> : <PortalView />}
      </div>
    </ModalProvider>
  );
}
