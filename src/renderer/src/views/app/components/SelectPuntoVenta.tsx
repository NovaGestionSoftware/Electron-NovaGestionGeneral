import { shoppingCart } from "@renderer/frontend-resources/assets/icons";
import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import { IoSearchSharp } from "react-icons/io5";

export default function SelectPuntoVenta({ dataLogin }) {
  return (
    <>
      <div className="flex gap-2 p-4 bg-gray-100">
        <FlexibleInputField
          label="Empresa"
          value={dataLogin?.empresa || ""}
          labelWidth="60px"
          inputWidth="w-24"
          containerWidth="w-80"
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
      <div className="p-1">
        <ActionButton
          onClick={() => {}}
          icon={<img src={shoppingCart as string} alt={"icon"} className={`h-10 w-10 drop-shadow-lg`} />}
          text={"00005"}
          addClassName="flex flex-col h-20 w-24"
        />
      </div>
    </>
  );
}
