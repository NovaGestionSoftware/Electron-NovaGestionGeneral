import { useState } from "react";
import { ActionButton } from "@renderer/frontend-resources/components";
import PruebaModal from "./PruebaModal";

export default function PlaygroundView() {
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState(false);

  function handleOpenModal() {
    setModalType("pruebaModal");
    setModalState(true);
  }

  const modals = {
    pruebaModal: <PruebaModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />,
  };

  return (
    <>
      <div className="w-[50rem] h-[30rem]">
        <ActionButton text="Abrir modal" onClick={() => handleOpenModal()} addClassName="" color="blue" />
      </div>
      {modalState && modalType && modals[modalType]}
    </>
  );
}
