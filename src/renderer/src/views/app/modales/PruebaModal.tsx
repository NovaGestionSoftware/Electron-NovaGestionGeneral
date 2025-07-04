import { ActionButton } from "@renderer/frontend-resources/components";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { useEffect, useState } from "react";

export default function PruebaModal({ showModalState, modalType, setShowModalState }) {
  const [showModal, setShowModal] = useState(false);

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

  //     useEffect(() => {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       // cerrar el modal de nivel 2 si NO hay un Modal2 abierto
  //       if (e.key === "Escape" && showModal === false && showModalState) {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         handleCloseModal();
  //       }
  //     };
  //     window.addEventListener("keydown", handleKeyDown, { capture: true });
  //     return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  //   }, [showModal, showModalState]);

  function handleCloseModal() {
    setShowModalState(false);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <>
      {showModalState && modalType === "pruebaModal" ? (
        <DraggableModal
          title="Prueba De Modal"
          isVisible={showModalState && modalType === "pruebaModal"}
          onClose={handleCloseModal}
          width="710px"
        >
          {/* CONTENIDO */}
          <div className="flex flex-col w-[700px] px-3 py-2 gap-3 overflow-hidden 2xl:gap-5">
            <ActionButton
              text={"Abrir modal"}
              onClick={handleOpenModal}
              size="sm"
              color={"gray"}
              addTextClassName="text-black"
              addClassName="h-12"
            />
          </div>
        </DraggableModal>
      ) : null}
    </>
  );
}
