import { acercarse } from "@renderer/frontend-resources/assets/icons";
import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import React from "react";

export default function SearchCard({ nivelUsuarioSeleccionado }) {
  return (
    <div className="flex justify-between items-center py-1 px-2 gap-2 bg-white rounded shadow-md">
      <div className="flex gap-2 p-2 border border-gray-400 rounded">
        <FlexibleInputField
          label="Categoría"
          value={nivelUsuarioSeleccionado?.codigo || ""}
          labelWidth="64px"
          inputWidth="w-24"
          containerWidth="w-50"
          disabled
        />

        <FlexibleInputField value={String(nivelUsuarioSeleccionado?.descripcion || "").toUpperCase()} disabled />
      </div>

      <div className="flex gap-2 p-2 border border-gray-400 rounded">
        <FlexibleInputField
          label="T.Categoría"
          value={String(nivelUsuarioSeleccionado?.descripcion || "").toUpperCase()}
          labelWidth="75px"
          inputWidth="w-50"
          disabled
        />
      </div>

      <ActionButton
        icon={<img src={acercarse} alt={"icon"} className="w-8" />}
        onClick={() => {}}
        size="sm"
        color={"gray"}
        addTextClassName="text-black"
        addClassName="h-12"
      />
    </div>
  );
}
