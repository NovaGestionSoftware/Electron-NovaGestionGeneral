import { useEffect, useState } from "react";
import RegistrarView from "../app/registrar/RegistrarView";
import PortalView from "../app/PortalView";

export default function Portal() {
  const [mode, setMode] = useState<"loading" | "registrar" | "login">("loading");
  const [empresaID, setEmpresaID] = useState<string | null>(null);

  useEffect(() => {
    const ipc = window.electron?.ipcRenderer;
    if (!ipc) return;

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
    <div className="flex items-center justify-center h-screen bg-portal">
      {mode === "loading" ? <p>Cargando...</p> : mode === "registrar" ? <RegistrarView /> : <PortalView />}
    </div>
  );
}
