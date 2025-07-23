import { useEffect, useRef, useState } from "react";
import logoNova from "@renderer/assets/novaicon2-256.png";
import DraggableModal from "@renderer/frontend-resources/electron/components/Modales/modalContainers/DraggableModal";
import { ActionButton } from "@renderer/frontend-resources/components";
import { avatar, building, key, usuarios } from "@renderer/frontend-resources/assets/icons";
import SelectPuntoVenta from "../components/SelectPuntoVenta";
import ConfiguracionAccesosModal from "./modales/configuracionAccesos/ConfiguracionAccesosModal";
import UsuariosModal from "./modales/UsuariosModal";
import CategoriasModal from "./modales/CategoriasModal";
import PasswordModal from "./modales/PasswordModal";
import AtributosCategoriasModal from "./modales/AtributosCategoriasModal";
import EnvSucModal from "./modales/EnvSucModal";
import NodosModal from "./modales/NodosModal";
import EmpresasModal from "./modales/EmpresasModal";
import RespaldarModal from "./modales/RespaldarModal";
import RegistrarModal from "./modales/RegistrarModal";
import ConfigPcModal from "./modales/ConfigPcModal";
import LoginModal from "./modales/LoginModal";
import EmpresaModal from "./modales/EmpresaModal";
import { obtieneUsuariosEmpresa } from "@renderer/services/axiosLogin";
import { DataLogin, DataUsuarios } from "@renderer/types/types";

interface MenuItem {
  name: string;
  subItems: SubItem[];
}

interface SubItem {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function PortalView() {
  const menuItems: MenuItem[] = [
    {
      name: "Usuario",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => handleOpenModal("usuariosModal") },
        { text: "Categorías", icon: usuarios, onClick: () => handleOpenModal("categoriasModal") },
        { text: "Passwords", icon: key, onClick: () => handleOpenModal("passwordModal") },
      ],
    },
    {
      name: "Atributos",
      subItems: [
        { text: "Usuarios", icon: avatar, onClick: () => handleOpenModal("configuracionAccesosModal") },
        { text: "Categorías", icon: usuarios, onClick: () => handleOpenModal("atributosCategoriasModal") },
        { text: "Env. Suc.", icon: key, onClick: () => handleOpenModal("envSucModal") },
      ],
    },
    {
      name: "Empresas",
      subItems: [
        { text: "Empresas", icon: avatar, onClick: () => handleOpenModal("empresasModal") },
        { text: "Nodos", icon: usuarios, onClick: () => handleOpenModal("nodosModal") },
      ],
    },
    {
      name: "Mantenimiento",
      subItems: [{ text: "Respaldar", icon: avatar, onClick: () => handleOpenModal("respaldarModal") }],
    },
    {
      name: "Utilidades",
      subItems: [
        { text: "Registrar", icon: avatar, onClick: () => handleOpenModal("registrarModal") },
        { text: "Config. PC", icon: usuarios, onClick: () => handleOpenModal("configPcModal") },
      ],
    },
  ];

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string>(menuItems[0]?.name || "");
  const [modalType, setModalType] = useState<string>("");
  const [modalState, setModalState] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [usuariosEmpresa, setUsuariosEmpresa] = useState<DataUsuarios[]>([]);
  const [dataLogin, setDataLogin] = useState<DataLogin>({ empresa: "", nfantasia: "", tusuario: 0, usuario: "" });
  const [contentVisible, setContentVisible] = useState<boolean>(false); // nuevo estado
  const [empresaID, setEmpresaID] = useState<string>("");

  const iniciarSesionButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const modals = {
    loginModal: (
      <LoginModal
        modalType={modalType}
        showModalState={modalState}
        setShowModalState={setModalState}
        setDataLogin={setDataLogin}
        empresaID={empresaID}
        handleClose={handleCerrarSesion}
        usuariosEmpresa={usuariosEmpresa}
        handleOpenModal={handleOpenModal}
        handleIniciarSesion={handleIniciarSesion}
      />
    ),
    empresaModal: (
      <EmpresaModal
        modalType={modalType}
        showModalState={modalState}
        setShowModalState={setModalState}
        dataLogin={dataLogin}
        setLogin={setLogin}
      />
    ),
    // usuarios
    usuariosModal: (
      <UsuariosModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    categoriasModal: (
      <CategoriasModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    passwordModal: (
      <PasswordModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    // atributos
    configuracionAccesosModal: (
      <ConfiguracionAccesosModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    atributosCategoriasModal: (
      <AtributosCategoriasModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    envSucModal: <EnvSucModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />,
    // empresas
    empresasModal: (
      <EmpresasModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    nodosModal: <NodosModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />,

    // mantenimiento
    respaldarModal: (
      <RespaldarModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    // utilidades

    registrarModal: (
      <RegistrarModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    configPcModal: (
      <ConfigPcModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />
    ),
    // pruebaModal: <PruebaModal modalType={modalType} showModalState={modalState} setShowModalState={setModalState} />,
  };

  useEffect(() => {
    // Poner el foco en el primer input cuando el componente se monta o al regresar
    iniciarSesionButtonRef?.current?.focus();
  }, []);

  // precionar escape volver atras
  // useEffect(() => {
  //   // Función para manejar el atajo de teclado
  //   const handleKeyDown = (event) => {
  //     // Si se presiona la tecla 'I'
  //     if (event.key === "i" || event.key === "I") {
  //       setShowLogin(true);
  //     }
  //     // Si se presiona la tecla 'Escape', cerrar el login
  //     if (event.key === "Escape") {
  //       setShowLogin(false);
  //     }
  //   };

  //   // Agregar el event listener cuando el componente se monte
  //   document.addEventListener("keydown", handleKeyDown);

  //   // Limpiar el event listener cuando el componente se desmonte
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  // tiempo demora para mostrar form y efecto
  useEffect(() => {
    if (showLogin) {
      // Esperamos que termine la transición de altura
      const timeout = setTimeout(() => setContentVisible(true), 600);
      return () => clearTimeout(timeout);
    } else {
      setContentVisible(false); // reiniciamos si se cierra
      return;
    }
  }, [showLogin]);

  useEffect(() => {
    async function fetchEmpresaID() {
      const id = await window.electron?.ipcRenderer?.invoke("get-initial-mode");

      setEmpresaID(id.empresaID || "No registrado");
    }

    fetchEmpresaID();
  }, []);

  function handleOpenModal(name?: string) {
    setModalType(name ? name : "pruebaModal");
    setModalState(true);
  }

  function handleClose() {
    if (!login) {
      setShowLogin(false);
    }
    if (login) {
      handleCerrarSesion();
    }
  }

  function handleCerrarSesion() {
    window?.electron?.ipcRenderer
      ?.invoke("show-native-alert", {
        type: "warning",
        title: "¿Estas seguro?",
        message: "¿Estas seguro? La sesión se cerrara.",
        buttons: ["Sí, salir", "Cancelar"],
        defaultId: 0,
        cancelId: 1,
      })
      .then((result) => {
        if (result?.response === 0) {
          setLogin(false);
          window?.electron?.ipcRenderer?.invoke("show-native-alert", {
            type: "info",
            title: "Sistema de Ventas",
            message: "sesión cerrada exitosamente.",
          });
        }
      });
  }

  async function handleIniciarSesion() {
    try {
      const respuesta = await obtieneUsuariosEmpresa(empresaID);
      setUsuariosEmpresa(respuesta.data);
      setShowLogin(true);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  }

  return (
    <>
      {/* Card Container */}
      <DraggableModal onClose={handleClose} withButton={showLogin ? true : false} width="740px">
        {/* Header */}
        <div className="relative bg-blue-900/90">
          <div
            className={`flex items-center justify-center px-4 overflow-hidden transition-all duration-700 ease-in-out ${
              showLogin ? "h-12" : "h-32"
            }`}
          >
            <div className="flex flex-col items-center transition-opacity duration-1000 ease-in-out">
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
              <div
                className={`absolute top-2 left-20 text-center transition-opacity duration-700 ${!showLogin && "hidden"} ${contentVisible ? "opacity-100" : "opacity-0"}`}
              >
                <h2 className="text-xl font-semibold text-white">Sistema Integrado Administración y Ventas</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="pt-1 relative">
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

          {/* Buttons - Solo se muestran si showLogin es false */}
          {!showLogin && (
            <div className="flex items-center justify-center gap-x-10 mb-6">
              <div className="border rounded-sm pl-[1px] pt-[0.5px] pb-[1px] pr-[2px]">
                <button
                  className="w-40 px-3 py-1.5  cursor-pointer rounded-xs bg-indigo-600  font-normal text-white text-sm shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleIniciarSesion}
                  ref={iniciarSesionButtonRef}
                >
                  <span className="underline">I</span>niciar sesión
                </button>
              </div>
              <div className="border rounded-sm pl-[1px] pt-[0.5px] pb-[1px] pr-[2px]">
                <button
                  onClick={() => window?.electron?.ipcRenderer?.send("close-app")}
                  className="w-40 px-3 py-1.5 cursor-pointer rounded-xs bg-gray-600  font-normal text-white text-sm shadow-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <span className="underline">S</span>alir
                </button>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div
            className={`${
              showLogin ? "transition-all duration-700 ease-in-out h-[450px] opacity-100" : "h-0 opacity-0"
            } overflow-hidden`}
          >
            {showLogin && (
              <div className={`flex transition-opacity duration-700 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
                {/* menu izquierdo */}
                <div className="bg-gray-200 w-60 h-[450px] p-2 overflow-y-auto">
                  {menuItems.map((item, index) => (
                    <div key={index} className="mb-2">
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className="w-full py-2 px-3 bg-gray-800/90 hover:bg-gray-900 text-white rounded-md text-left flex justify-between items-center transition-colors cursor-pointer"
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
                        <div className="flex flex-col justify-center items-center gap-1 mt-1">
                          {item.subItems.map((subItem, index) => (
                            <ActionButton
                              text={subItem.text}
                              onClick={subItem.onClick}
                              key={index}
                              addClassName="w-38 flex justify-start"
                              icon={
                                <img
                                  src={subItem.icon as string}
                                  alt={subItem.text?.toLowerCase()}
                                  className={`h-6 w-6 mr-1 ${!login ? "grayscale-100 opacity-60" : " drop-shadow-lg"}`}
                                />
                              }
                              color={`${!login ? "grayDeshab" : "gray"}`}
                              disabled={!login}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-white">
                  {/* menu derecho superior */}
                  <div className="flex flex-col items-start gap-2 w-full bg-gray-100 py-1 px-2">
                    <div className="flex items-center space-x-2">
                      <ActionButton
                        onClick={() => handleOpenModal("loginModal")}
                        icon={<img src={avatar as string} alt={"icon"} className={`h-6 w-6 drop-shadow-lg`} />}
                      />
                      <p className="font-bold text-red-800">{login && dataLogin?.usuario}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ActionButton
                        onClick={() => handleOpenModal("empresaModal")}
                        icon={
                          <img
                            src={building as string}
                            alt={"icon"}
                            className={`h-6 w-6 mr-1 ${!login ? "grayscale-100 opacity-60" : " drop-shadow-lg"}`}
                          />
                        }
                        color={`${!login ? "grayDeshab" : "gray"}`}
                        disabled={!login}
                      />
                      <p className="font-bold text-red-800">{login && dataLogin?.nfantasia?.toUpperCase()}</p>
                    </div>
                  </div>
                  {
                    // showLogin && !login ? (
                    //   <LoginForm setLogin={setLogin} setDataLogin={setDataLogin} empresaID={empresaID} />
                    // ) :
                    login ? <SelectPuntoVenta dataLogin={dataLogin} empresaID={empresaID} /> : null
                  }
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center py-6 text-sm font-semibold text-gray-600 rounded-b-md ${showLogin && "hidden"}`}>
          Email: soporte@novagestion.com.ar
        </div>
      </DraggableModal>
      {modalState && modalType && modals[modalType]}
    </>
  );
}
