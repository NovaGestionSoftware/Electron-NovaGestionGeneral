import { useEffect, useRef, useState } from "react";
import RegistrarView from "../app/registrar/RegistrarView";
import PortalView from "../app/PortalView";
import { ModalProvider } from "@renderer/frontend-resources/electron/components/Modales/context/ModalContext";
import logoNova from "@renderer/frontend-resources/assets/logos/novaIcon.png";
import AcercaDeView from "../app/Archivo/AcercaDeView";
import Modal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/Modal";

export default function Portal() {
  const [mode, setMode] = useState<"loading" | "registrar" | "login">("loading");
  const [empresaID, setEmpresaID] = useState<string | null>(null);
  const [openModals, setOpenModals] = useState<any[]>([]);
  const nextId = useRef(1);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  });

  const modalConfig = {
    //archivo
    acercaDe: {
      key: "show-acerca-de",
      title: "Novagestión",
      component: (modalId: string, onClose: () => void) => <AcercaDeView modalId={modalId} onClose={onClose} />,
    },
  };

  // Efecto para cerrar modal con escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Si algún modal 2 o modal 3 hizo preventDefault(), aquí defaultPrevented === true
      if (e.key === "Escape" && !e.defaultPrevented) {
        if (openModals.length === 0) return;
        setOpenModals((prev) => prev.slice(0, -1)); // cierra el modal de nivel 1
      }
    };
    // este listener va en modo “bubble” (no capture)
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModals]);

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

  useEffect(() => {
    const modalHandlers = Object.entries(modalConfig).reduce(
      (handlers, [configKey, modal]) => {
        handlers[modal.key] = () => openModalOnTop(configKey);
        return handlers;
      },
      {} as Record<string, () => void>,
    );

    for (const [event, handler] of Object.entries(modalHandlers)) {
      window.electron?.ipcRenderer?.on(event, handler);
    }
    return () => {
      for (const [event, handler] of Object.entries(modalHandlers)) {
        window.electron?.ipcRenderer?.removeListener(event, handler);
      }
    };
  }, []);

  function openModalOnTop(type: string) {
    setOpenModals((prev) => {
      //  const existing = prev.find((m) => m.type === type);
      // if (existing) {
      //   return [...prev.filter((m) => m.type !== type), existing];
      // }
      const newModal: any = { id: nextId.current++, type };
      return [...prev, newModal];
    });
  }

  function bringModalToFront(id: number) {
    setOpenModals((prev) => {
      const modal = prev.find((m) => m.id === id);
      if (!modal) return prev;
      // Mueve el modal al final del array (último = encima)
      return [...prev.filter((m) => m.id !== id), modal];
    });
  }

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
        </div>
        {mode === "loading" ? <p></p> : mode === "registrar" ? <RegistrarView /> : <PortalView />}
      </div>
      {openModals.map((modal, idx) => {
        const zIndex = 50 + idx;
        const modalData = modalConfig[modal.type];
        if (!modalData) return null;

        return (
          <Modal
            key={modal.id}
            isOpen
            title={modalData.title}
            zIndex={zIndex}
            onClose={() => setOpenModals((prev) => prev.filter((m) => m.id !== modal.id))}
            onFocus={() => bringModalToFront(modal.id)}
          >
            {typeof modalData.component === "function"
              ? modalData.component(modal.id, () => setOpenModals((prev) => prev.filter((m) => m.id !== modal.id)))
              : modalData.component}

            {/* {modalData.component(modal?.id)} */}
          </Modal>
        );
      })}
    </ModalProvider>
  );
}
