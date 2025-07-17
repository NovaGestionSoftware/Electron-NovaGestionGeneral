import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function EmpresaModal({ showModalState, modalType, setShowModalState, dataLogin, empresaID }) {
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
      {showModalState && modalType === "empresaModal" ? (
        <DraggableModal
          title="empresa modal"
          isVisible={showModalState && modalType === "empresaModal"}
          onClose={handleCloseModal}
          width="600px"
          index={40}
        >
          {/* CONTENIDO */}
          <div className="flex gap-2 p-4 bg-gray-100">
            <FlexibleInputField
              label="Empresa"
              value={empresaID}
              labelWidth="60px"
              inputWidth="w-24"
              containerWidth="w-70"
            />
            <ActionButton
              icon={<IoSearchSharp className={`h-6 w-6 ml-0.5 drop-shadow-lg`} />}
              size="xs"
              color="blue"
              onClick={() => {}}
              addClassName="h-8 w-8"
            />
            <FlexibleInputField value={(dataLogin?.nfantasia || "").trim().toUpperCase()} />
          </div>
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}
