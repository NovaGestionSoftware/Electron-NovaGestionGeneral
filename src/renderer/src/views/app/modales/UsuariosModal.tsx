import { ColumnDef } from "@renderer/frontend-resources/electron/utils/table";
import { FlexibleInputField } from "@renderer/frontend-resources/components";
import { useEffect, useRef, useState } from "react";
import EntityInfoModal from "@renderer/frontend-resources/electron/components/Modales/EntityInfoModal";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";

export default function UsuariosModal({ modalType, showModalState, setShowModalState }) {
  const [inputCodigo, setInputCodigo] = useState("");
  const [inputNombre, setInputNombre] = useState("");

  const obtieneUsuarios = async () => {
    return {
      data: [
        { CODIGO: "00001", NOMBRE: "Supervisor" },
        { CODIGO: "00002", NOMBRE: "Cajero Juan" },
        { CODIGO: "00003", NOMBRE: "Cajero David" },
        { CODIGO: "00004", NOMBRE: "Cajero Pablo" },
        { CODIGO: "00005", NOMBRE: "Cajera Sonia" },
      ],
    };
  };

  const [disabled, setDisabled] = useState(true);
  const dataColumns: ColumnDef<any>[] = [
    { key: "id", label: "", minWidth: "0", maxWidth: "0" },
    { key: "codigo", label: "Código", minWidth: "80", maxWidth: "80", resaltar: true },
    { key: "nombre", label: "Nombre", minWidth: "380", maxWidth: "420" },
  ];

  const nombreInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (!disabled) {
      // Damos un pequeño delay para que React haya renderizado el input habilitado
      setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 50);
    }
  }, [disabled]);

  const itemToNode = (item: any, index: number) => ({
    id: index + 1,
    codigo: item.CODIGO.trim(),
    nombre: item.NOMBRE.trim(),
    nodes: [],
  });

  const datosFooter = (filteredData: any[]) => ({
    codigo: filteredData.length,
  });

  const filterFunction = (data: any[], searchTerms: Record<string, string>) =>
    data.filter(
      (item) =>
        item.CODIGO.toLowerCase().includes(searchTerms.codigo?.toLowerCase() || "") &&
        item.NOMBRE.toLowerCase().includes(searchTerms.nombre?.toLowerCase() || ""),
    );

  const handleCreateItem = () => {
    // setInputCodigo("");
    // setInputNombre("");
    // setDisabled(false);
  };

  const detailContent = (selectedItem: any) => (
    <>
      <FlexibleInputField
        label="Código"
        value={selectedItem ? selectedItem?.codigo : inputCodigo}
        onChange={(value) => setInputCodigo(value)}
        labelWidth="100px"
        inputClassName="max-w-[150px]"
        disabled
      />
      <FlexibleInputField
        label="Nombre"
        value={selectedItem?.nombre}
        onChange={(value) => setInputNombre(value)}
        labelWidth="100px"
        inputClassName="max-w-[250px]"
        disabled={disabled}
        inputRef={nombreInputRef}
      />
    </>
  );

  const handleSave = async () => {};

  const handleCancel = () => {};

  return (
    <>
      {showModalState && modalType === "usuariosModal" ? (
        <DraggableModal
          title="Usuarios"
          isVisible={showModalState && modalType === "usuariosModal"}
          onClose={handleCloseModal}
          index={40}
        >
          {/* CONTENIDO */}
          <EntityInfoModal
            itemToNode={itemToNode}
            service={obtieneUsuarios}
            columns={dataColumns}
            footerData={datosFooter}
            onFilter={filterFunction}
            detailContent={detailContent}
            onSave={handleSave}
            onCancel={handleCancel}
            disabled={disabled}
            setDisabled={setDisabled}
            handleCreateItem={handleCreateItem}
          />
        </DraggableModal>
      ) : null}
      <div className="opacity-45 fixed inset-0 z-30 bg-black"></div>
    </>
  );
}
