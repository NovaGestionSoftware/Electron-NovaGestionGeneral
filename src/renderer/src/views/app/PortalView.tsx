import { useEffect, useState } from "react";
import logoNova from "@renderer/assets/novaicon2-256.png";

export default function PortalView() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Función para manejar el atajo de teclado
    const handleKeyDown = (event) => {
      // Si se presiona la tecla 'I'
      if (event.key === "i" || event.key === "I") {
        setShowLogin(true);
      }
      // Si se presiona la tecla 'Escape', cerrar el login
      if (event.key === "Escape") {
        setShowLogin(false);
      }
    };

    // Agregar el event listener cuando el componente se monte
    document.addEventListener("keydown", handleKeyDown);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Card Container */}
      <div className="bg-gray-200 border rounded-lg shadow-2xl drop-shadow-xl w-[450px] p-0.5">
        {/* Header */}
        <div className="bg-blue-900/90 rounded-t-lg ">
          <div className="flex items-center justify-center px-4">
            <div className="flex flex-col items-center ">
              <img
                alt="logo"
                className="w-[150px] h-[150px] transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:filter"
                src={logoNova}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-4 relative border-x">
          {/* Title Section */}
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-slate-900/80 text-4xl font-bold"> NovaGestión</h1>
            {/* Botón Volver */}
            {showLogin && (
              <button
                className="absolute left-0 top-9 bg-slate-600 px-2 pb-1 ml-4 text-2xl text-white font-semibold rounded transform -translate-y-1/2 cursor-pointer hover:bg-slate-700 transition"
                onClick={() => setShowLogin(false)}
              >
                &lt;
              </button>
            )}
          </div>

          <div className={`text-center ${!showLogin ? "mb-10" : "mb-1"}`}>
            <h2 className="text-2xl font-semibold text-rose-700">Sistema Integrado</h2>
            <h2 className="text-2xl font-semibold text-rose-700">Administración y Ventas</h2>
          </div>

          {/* Buttons - Solo se muestran si showLogin es false */}
          {!showLogin && (
            <div className="flex items-center justify-center gap-x-10 mb-6">
              <div className="border rounded-sm pl-[1px] pt-[0.5px] pb-[1px] pr-[2px]">
                <button
                  className="w-40 px-3 py-1.5  cursor-pointer rounded-xs bg-indigo-600  font-normal text-white text-sm shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowLogin(true)}
                >
                  <span className="underline">I</span>niciar sesión
                </button>
              </div>
              <div className="border rounded-sm pl-[1px] pt-[0.5px] pb-[1px] pr-[2px]">
                <button className="w-40 px-3 py-1.5 cursor-pointer rounded-xs bg-gray-600  font-normal text-white text-sm shadow-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <span className="underline">S</span>alir
                </button>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div
            className={` ${
              showLogin ? "transition-all duration-500 ease-in-out h-[300px] opacity-100" : "h-0 opacity-0"
            } overflow-hidden`}
          >
            {showLogin && (
              <div>
                <h1 className="">LOGIN FORM</h1>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-sm font-semibold text-gray-600 border-x border-b rounded-b-md">
          Email: soporte@novagestion.com.ar
        </div>
      </div>
    </>
  );
}
