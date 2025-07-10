import { ActionButton } from "@renderer/frontend-resources/components";
import { arrows, excel, fileAdd, printer, salir } from "@renderer/frontend-resources/assets/icons";
// import useMovimientoCajaStore from '../store/useNotaPedidoStore';

type Color = "indigo" | "blue" | "green" | "gray" | "sky" | "grayDeshab" | "indigoStrong" | "sky";

type ButtonsProps = {
  icon: JSX.Element | string;
  text?: string;
  color?: Color;
  onClose?: void;
  onClick: () => void;
};

export default function HerramientasConfigAcceso({ onClose }) {
  // const { isFetch, setIsFetch } = useMovimientoCajaStore();

  const buttons: ButtonsProps[] = [
    { icon: fileAdd, text: "Modificar", onClick: () => {} },
    { icon: salir, onClick: handleCloseModal },
  ];

  function handleCloseModal() {
    onClose() && onClose();
  }

  return (
    <div className="flex justify-between items-center w-full py-1 px-2 bg-white rounded shadow-md">
      {buttons.map((button, index) => {
        return (
          <ActionButton
            key={index}
            text={button.text}
            icon={
              <img
                src={button.icon as string}
                alt={button.text?.toLowerCase()}
                className={`h-6 w-6 ml-0.5 drop-shadow-lg`}
              />
            }
            size="sm"
            onClick={button.onClick}
            // addClassName="max-w-42 h-[50px]"
            color={`gray`}
            // disabled={!isFetch}
            addTextClassName={`text-black`}
            addClassName="h-9"
          />
        );
      })}
    </div>
  );
}
