import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { useEffect, useState } from "react";
import HerramientasConfigAcceso from "./components/HerramientasConfigAcceso";
import SearchCard from "./components/SearchCard";
import AccesosTable from "./components/AccesosTable";

export default function ConfiguracionAccesosModal({ showModalState, modalType, setShowModalState }) {
  // const [showModal, setShowModal] = useState(false);
  const [nivelUsuarioSeleccionado, setNivelUsuarioSeleccionado] = useState({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // 1. Prevent default y marcamos defaultPrevented
        e.preventDefault();
        // (opcional) stopPropagation no hace falta si solo con preventDefault es suficiente,
        // pero podemos asegurarnos de que no siga ningún otro listener:
        e.stopPropagation();
        handleCloseModal();
      }
    };
    // 2. pasamos { capture: true } para que este listener se ejecute en la fase de captura
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [handleCloseModal]);

  function handleCloseModal() {
    setShowModalState(false);
  }

  // function handleOpenModal() {
  //   setShowModal(true);
  // }

  return (
    <>
      {showModalState && modalType === "configuracionAccesosModal" ? (
        <DraggableModal
          title="Configuración de Accesos"
          isVisible={showModalState && modalType === "configuracionAccesosModal"}
          onClose={handleCloseModal}
          width="1050px"
          index={40}
        >
          <div className="space-y-1">
            {/* CONTENIDO */}
            <HerramientasConfigAcceso onClose={handleCloseModal} />
            <SearchCard nivelUsuarioSeleccionado={nivelUsuarioSeleccionado}  />
            <AccesosTable setNivelUsuarioSeleccionado={setNivelUsuarioSeleccionado} nivelUsuarioSeleccionado={nivelUsuarioSeleccionado} />
          </div>
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}
