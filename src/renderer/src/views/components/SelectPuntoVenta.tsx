import { shoppingCart } from "@renderer/frontend-resources/assets/icons";
import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import LoadingComponent from "@renderer/frontend-resources/electron/components/Loading/LoadingComponent";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SelectPuntoVenta({ dataLogin, empresaID }) {
  const [loading, setLoading] = useState(false);
  const [readyTimeout, setReadyTimeout] = useState<NodeJS.Timeout | null>(null);
  const readyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dataLoginConEmpresa = {
    ...dataLogin,
    empresaId: empresaID, //numero de empresa registro del editor
  };

  useEffect(() => {
    const handleReady = () => {
      console.log("✅ App secundaria lista");
      setLoading(false);

      // Cancelamos el timeout si ya se lanzó la app correctamente
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }
    };

    // Escuchar el evento del sistema
    window.electron?.ipcRenderer?.on("sistema-ready", handleReady);

    return () => {
      // Limpiar listeners y timeout cuando se desmonte el componente
      window.electron?.ipcRenderer?.removeAllListeners("sistema-ready");
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
      }
    };
  }, []);

  const handleLaunchApp = () => {
    window.electron?.ipcRenderer
      ?.invoke("launch-sistema-app", JSON.stringify(dataLoginConEmpresa))
      .then(() => {
        setLoading(true);

        // Si no llega el evento READY en 20 segundos, mostrar alerta
        if (readyTimeoutRef.current) {
          clearTimeout(readyTimeoutRef.current); // Evitar duplicados
        }

        const timeout = setTimeout(() => {
          console.warn("⚠️ No se recibió 'READY' en tiempo esperado");
          setLoading(false);
          window?.electron?.ipcRenderer?.invoke("show-native-alert", {
            type: "error",
            title: "Sistema de Ventas",
            message: "No se pudo encontrar el ejecutable del sistema.",
          });
        }, 20000);

        readyTimeoutRef.current = timeout;
      })
      .catch((err) => {
        console.error("Error al lanzar app:", err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingComponent text="Iniciando Sistema..." />}

      <div className="p-1">
        <ActionButton
          onClick={handleLaunchApp}
          icon={<img src={shoppingCart as string} alt={"icon"} className={`h-10 w-10 drop-shadow-lg`} />}
          text={"0005"}
          addClassName="flex flex-col h-20 w-24"
        />
      </div>
    </>
  );
}
