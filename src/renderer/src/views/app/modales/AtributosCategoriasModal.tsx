import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { useEffect } from "react";

interface AtributosCategoriasModalProps {
  modalType: string;
  showModalState: boolean;
  setShowModalState: (value: boolean) => void;
}

export default function AtributosCategoriasModal({
  showModalState,
  modalType,
  setShowModalState,
}: AtributosCategoriasModalProps) {
  // const [showModal, setShowModal] = useState(false);

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
      {showModalState && modalType === "atributosCategoriasModal" ? (
        <DraggableModal
          title="Categorías"
          isVisible={showModalState && modalType === "atributosCategoriasModal"}
          onClose={handleCloseModal}
          width="400px"
          index={40}
        >
          {/* CONTENIDO */}
          <div>Modal de prueba</div>
          {/* <div className="flex flex-col w-[700px] px-3 py-2 gap-3 overflow-hidden 2xl:gap-5">
            <ActionButton
              text={"Abrir modal"}
              onClick={handleOpenModal}
              size="sm"
              color={"gray"}
              addTextClassName="text-black"
              addClassName="h-12"
            />
          </div> */}
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}
