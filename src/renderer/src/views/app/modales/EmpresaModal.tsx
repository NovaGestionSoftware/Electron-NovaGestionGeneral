import { done, close } from "@renderer/frontend-resources/assets/icons";
import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { DataLogin } from "@renderer/types/types";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import EmpresasModal from "./EmpresasModal";

interface EmpresaModalProps {
  dataLogin: DataLogin;
  showModalState: boolean;
  modalType: string;
  setShowModalState: (value: boolean) => void;
  setLogin: (value: boolean) => void;
}

export default function EmpresaModal({
  showModalState,
  modalType,
  setShowModalState,
  dataLogin,
  setLogin,
}: EmpresaModalProps) {
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

  function handleCloseModal() {
    setShowModalState(false);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <>
      {showModalState && modalType === "empresaModal" ? (
        <DraggableModal
          title="Empresa"
          isVisible={showModalState && modalType === "empresaModal"}
          onClose={handleCloseModal}
          width="600px"
          index={40}
        >
          {/* CONTENIDO */}
          <div className="flex flex-col gap-2 p-4 bg-gray-100">
            <div className="flex gap-2">
              <FlexibleInputField
                label="Empresa"
                value={dataLogin?.empresa}
                labelWidth="60px"
                inputWidth="w-24"
                containerWidth="w-70"
              />
              <ActionButton
                icon={<IoSearchSharp className={`h-6 w-6 ml-0.5 drop-shadow-lg`} />}
                size="xs"
                color="blue"
                onClick={handleOpenModal}
                addClassName="h-8 w-8"
              />
              <FlexibleInputField value={(dataLogin?.nfantasia || "").trim().toUpperCase()} />
            </div>
            <div className="flex justify-between gap-2 mt-4">
              <ActionButton
                text="Cerrar Empresa"
                onClick={() => {
                  setLogin(false);
                  handleCloseModal();
                }}
              />
              <div className="space-x-2">
                <ActionButton
                  icon={<img src={done} alt="ok" className={"w-6 h-6  drop-shadow-lg"} />}
                  onClick={() => {
                    setLogin(true);
                    handleCloseModal();
                  }}
                  color={"gray"}
                />
                <ActionButton
                  icon={<img src={close} alt="ok" className={"w-6 h-6  drop-shadow-lg"} />}
                  onClick={handleCloseModal}
                  color={"gray"}
                />
              </div>
            </div>
          </div>
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
      {showModal && <EmpresasModal showModalState={true} modalType={"empresasModal"} onClose={() => setShowModal(false)} />}
    </>
  );
}
