import { shoppingCart } from "@renderer/frontend-resources/assets/icons";
import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import LoadingComponent from "@renderer/frontend-resources/electron/components/Loading/LoadingComponent";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SelectPuntoVenta({ dataLogin }) {
  const [loading, setLoading] = useState(false);
  const [readyTimeout, setReadyTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleReady = () => {
      console.log("✅ App secundaria lista");
      setLoading(false);
      if (readyTimeout) clearTimeout(readyTimeout);
    };

    window.electron?.ipcRenderer?.on("sistema-ready", handleReady);

    return () => {
      window.electron?.ipcRenderer?.removeAllListeners("sistema-ready");
      if (readyTimeout) clearTimeout(readyTimeout);
    };
  }, []);

  const handleLaunchApp = () => {
    window.electron?.ipcRenderer
      ?.invoke("launch-sistema-app", JSON.stringify(dataLogin))
      .then(() => {
        setLoading(true);

        // Si no llega 'READY' en 10 segundos, desactivamos el loading
        const timeout = setTimeout(() => {
          console.warn("⚠️ No se recibió 'READY' en tiempo esperado");
          setLoading(false);
          window?.electron?.ipcRenderer?.invoke("show-native-alert", {
            type: "error",
            title: "Sistema de Ventas",
            message: "No se pudo encontrar el ejecutable del sistema.",
          });
        }, 20000);

        setReadyTimeout(timeout);
      })
      .catch((err) => {
        console.error("Error al lanzar app:", err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingComponent text="Iniciando Sistema..." />}

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
          onClick={handleLaunchApp}
          icon={<img src={shoppingCart as string} alt={"icon"} className={`h-10 w-10 drop-shadow-lg`} />}
          text={"00005"}
          addClassName="flex flex-col h-20 w-24"
        />
      </div>
    </>
  );
}
