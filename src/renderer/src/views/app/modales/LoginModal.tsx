import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import LoginForm from "@renderer/views/components/LoginForm";
import { useEffect } from "react";

export default function LoginModal({
  showModalState,
  modalType,
  setShowModalState,
  setLogin,
  setDataLogin,
  empresaID,
  handleClose,
  usuariosEmpresa,
  handleOpenModal
}) {
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
      {showModalState && modalType === "loginModal" ? (
        <DraggableModal
          title="Ingreso de Usuario"
          isVisible={showModalState && modalType === "loginModal"}
          onClose={handleCloseModal}
          width="600px"
          index={40}
        >
          {/* CONTENIDO */}
          <div className="p-2 bg-white rounded-b">
            <LoginForm
              setLogin={setLogin}
              setDataLogin={setDataLogin}
              empresaID={empresaID}
              handleClose={handleClose}
              handleCloseModal={handleCloseModal}
              usuariosEmpresa={usuariosEmpresa}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}
