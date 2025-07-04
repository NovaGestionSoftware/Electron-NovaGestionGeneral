import { useEffect, useState } from "react";
import logoNova from "@renderer/assets/novaicon2-256.png";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { ActionButton } from "@renderer/frontend-resources/components";
import { avatar, key, usuarios } from "@renderer/frontend-resources/assets/icons";
import PruebaModal from "./modales/PruebaModal";
import LoginForm from "./components/LoginForm";

export default function PortalView() {
  const [showLogin, setShowLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      name: "Usuario",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => {} },
        { text: "Categorías", icon: usuarios, onClick: () => {} },
        { text: "Passwords", icon: key, onClick: () => {} },
      ],
    },
    {
      name: "Atributos",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => {} },
        { text: "Categorías", icon: usuarios, onClick: () => {} },
        { text: "Passwords", icon: key, onClick: () => {} },
      ],
    },
    {
      name: "Empresas",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => {} },
        { text: "Categorías", icon: usuarios, onClick: () => {} },
        { text: "Passwords", icon: key, onClick: () => {} },
      ],
    },
    {
      name: "Mantenimiento",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => {} },
        { text: "Categorías", icon: usuarios, onClick: () => {} },
        { text: "Passwords", icon: key, onClick: () => {} },
      ],
    },
    {
      name: "Utilidades",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => {} },
        { text: "Categorías", icon: usuarios, onClick: () => {} },
        { text: "Passwords", icon: key, onClick: () => {} },
      ],
    },
  ];

  const modals = {
    pruebaModal: <PruebaModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />,
  };

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

  function handleOpenModal() {
    setModalType("pruebaModal");
    setModalState(true);
  }

  const handleClose = () => {
    console.log("Cerrar modal");
  };

  return (
    <>
      {/* Card Container */}
      <DraggableModal onClose={handleClose} width="800px">
        {/* Header */}
        <div className="relative bg-blue-900/90">
          <div
            className={`flex items-center justify-center px-4 overflow-hidden transition-all duration-500 ease-in-out ${
              showLogin ? "h-12" : "h-32"
            }`}
          >
            <div className="flex flex-col items-center transition-opacity duration-500 ease-in-out">
              <img
                alt="logo"
                src={logoNova}
                className={`absolute transition-all duration-500 ease-in-out hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:filter 
      ${
        showLogin
          ? "top-0 left-4 w-12 h-12" // arriba a la izquierda, más pequeño
          : "top-1/2 left-1/2 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2" // centrado
      }`}
              />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="pt-1 relative border-x">
          {!showLogin && (
            <div>
              {/* Title Section */}
              <div className=" pt-4 text-center space-y-2 mb-6">
                <h1 className="text-slate-900/80 text-4xl font-bold"> NovaGestión</h1>
                {/* Botón Volver */}
              </div>
              <div className={`text-center ${!showLogin ? "mb-10" : "mb-1"}`}>
                <h2 className="text-2xl font-semibold text-rose-700">Sistema Integrado</h2>
                <h2 className="text-2xl font-semibold text-rose-700">Administración y Ventas</h2>
              </div>
            </div>
          )}
          {/* boton atras */}
          {showLogin && (
            <button
              className="absolute left-0 bottom-0 bg-slate-600 px-2 pb-1 ml-4 text-2xl text-white font-semibold rounded transform -translate-y-1/2 cursor-pointer hover:bg-slate-700 transition z-10"
              onClick={() => setShowLogin(false)}
            >
              &lt;
            </button>
          )}
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
              showLogin ? "transition-all duration-500 ease-in-out h-[500px] opacity-100" : "h-0 opacity-0"
            } overflow-hidden`}
          >
            {showLogin && (
              <div className="flex">
                <div className="bg-gray-300 w-60 h-[500px] p-4 overflow-y-auto">
                  {menuItems.map((item, index) => (
                    <div key={index} className="mb-2">
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className="w-full py-2 px-4 bg-gray-400 hover:bg-gray-500 rounded-md text-left flex justify-between items-center transition-colors  cursor-pointer"
                      >
                        {item.name}
                        <span
                          className={`transform transition-transform ${openMenu === item.name ? "rotate-180" : ""}`}
                        >
                          ▼
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === item.name ? "max-h-40" : "max-h-0"}`}
                      >
                        <div className="pl-4 pt-2 space-y-1">
                          {item.subItems.map((subItem, index) => (
                            <ActionButton
                              text={subItem.text}
                              onClick={subItem.onClick}
                              key={index}
                              icon={
                                <img
                                  src={subItem.icon as string}
                                  alt={subItem.text?.toLowerCase()}
                                  className={`h-6 w-6 drop-shadow-lg`}
                                />
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-2 h-12 w-full bg-gray-100 px-2">
                    <ActionButton
                      onClick={() => handleOpenModal()}
                      icon={<img src={avatar as string} alt={"icon"} className={`h-6 w-6 drop-shadow-lg`} />}
                    />
                    <ActionButton
                      onClick={() => handleOpenModal()}
                      icon={<img src={avatar as string} alt={"icon"} className={`h-6 w-6 drop-shadow-lg`} />}
                    />
                  </div>
                  {showLogin && <LoginForm />}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`text-center py-6 text-sm font-semibold text-gray-600 border-x border-b rounded-b-md ${showLogin && "hidden"}`}
        >
          Email: soporte@novagestion.com.ar
        </div>
      </DraggableModal>
      {modalState && modalType && modals[modalType]}
    </>
  );
}
