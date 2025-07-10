import NivelUsuarioTabla from "./NivelUsuarioTabla";
import DetalleProgramaTabla from "./DetalleProgramaTabla";
import { ActionButton } from "@renderer/frontend-resources/components";
import { save, close } from "@renderer/frontend-resources/assets/icons";

export default function AccesosTable({ setNivelUsuarioSeleccionado, nivelUsuarioSeleccionado }) {
  return (
    <div className="relative flex w-full py-1 px-2 gap-2 bg-white rounded shadow-md">
      <NivelUsuarioTabla setNivelUsuarioSeleccionado={setNivelUsuarioSeleccionado} nivelUsuarioSeleccionado={nivelUsuarioSeleccionado} />
      <DetalleProgramaTabla />
      <div className="absolute left-30 bottom-4 flex flex-col gap-2">
        <ActionButton text="Todos los Programas" />
        <ActionButton text="Todos las Opciones" />
      </div>

      <div className="absolute bottom-4 right-4 space-x-4">
        <div className="flex flex-col gap-2">
          {/* Boton Guardar */}
          <ActionButton
            icon={
              <img src={save} alt="ok" className={`h-9 w-9 ${!true ? "grayscale opacity-50" : "drop-shadow-lg"}`} />
            }
            addIconClassName="p-2"
            onClick={() => {}}
            size="sm"
            color={`${true ? "gray" : "grayDeshab"}`}
            disabled={!true}
            addClassName="h-12"
          />

          {/* Boton Drop */}
          <ActionButton
            icon={
              <img src={close} alt="drop" className={`h-9 w-9 ${!true ? "grayscale opacity-50" : "drop-shadow-lg"}`} />
            }
            addIconClassName={`p-2`}
            size="sm"
            color={`${true ? "gray" : "grayDeshab"}`}
            addClassName="h-12"
          />
        </div>
      </div>
    </div>
  );
}
