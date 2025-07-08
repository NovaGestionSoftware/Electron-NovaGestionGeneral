// import { ModalProvider } from "@renderer/frontend-resourses/test-view/context/ModalContext";
// import { useEffect, useState, useRef, useCallback } from "react";
// import { Outlet } from "react-router-dom";
// // import Modal from "@renderer/views/components/ui/Modales/Modal";

// interface OpenModal {
//   id: number;
//   type: string;
// }
// export default function Layout() {
//   const [openModals, setOpenModals] = useState<OpenModal[]>([]);
//   const nextId = useRef(1);

//   //   const modalConfig = {
//   //     //archivo
//   //     acercaDe: {
//   //       key: "show-acerca-de",
//   //       title: "Novagestión",
//   //       component: (modalId: string, onClose: () => void) => <AcercaDeView modalId={modalId} onClose={onClose} />,
//   //     },
//   //     //configuracion
//   //     configuracion: {
//   //       key: "show-configuracion",
//   //       title: "Configuración",
//   //       component: <ConfigView />,
//   //     },
//   //     // datos
//   //     marcas: {
//   //       key: "show-marcas",
//   //       title: "Marcas",
//   //       component: <MarcasView />,
//   //     },
//   //     secciones: {
//   //       key: "show-secciones",
//   //       title: "Secciones",
//   //       component: <SeccionesView />,
//   //     },
//   //     rubros: {
//   //       key: "show-rubros",
//   //       title: "Rubros",
//   //       component: <RubrosView />,
//   //     },

//   //     configuracionCaja: {
//   //       key: "show-configuracion-caja",
//   //       title: "Parámetros de Caja",
//   //       component: (modalId: string, onClose: () => void) => (
//   //         <ConfiguracionCajaView modalId={modalId} onClose={onClose} />
//   //       ),
//   //     },
//   //     uNegocio: {
//   //       key: "show-u-negocio",
//   //       title: "Unidades de Negocio",
//   //       component: (modalId: string, onClose: () => void) => <UNegocioView />,
//   //     },
//   //     // fondos
//   //     fondos: {
//   //       key: "show-fondos",
//   //       title: "Datos de Fondos",
//   //       component: <FondosView />,
//   //     },
//   //     planes: {
//   //       key: "show-planes",
//   //       title: "Datos de planes",
//   //       component: <PlanesView />,
//   //     },
//   //     descuentos: {
//   //       key: "show-medios-caja-descuentos",
//   //       title: "Cuotas Planes (Descuentos)",
//   //       component: (modalId: string, onClose: () => void) => (
//   //         <MedioCajaDescuentosView modalId={modalId} onClose={onClose} />
//   //       ),
//   //     },
//   //     recargos: {
//   //       key: "show-medios-caja-recargos",
//   //       title: "Cuota Planes (Recargos)",
//   //       component: (modalId: string, onClose: () => void) => (
//   //         <MedioCajaRecargosView modalId={modalId} onClose={onClose} />
//   //       ),
//   //     },
//   //     // clientes
//   //     clientes: {
//   //       key: "show-clientes",
//   //       title: "Clientes",
//   //       component: (modalId: string) => <ClientsView modalId={modalId} />,
//   //     },
//   //     configuracionMensajes: {
//   //       key: "show-configuracion-mensajes",
//   //       title: "Configuración de Mensajes",
//   //       component: <ConfigMensajesView />,
//   //     },
//   //     // facturacion
//   //     Ticket: {
//   //       key: "show-ticket",
//   //       title: "Ticket",
//   //       component: (modalId: string, onClose: () => void) => <TicketView modalId={modalId} onClose={onClose} />,
//   //     },
//   //     facturacion: {
//   //       key: "show-facturacion",
//   //       title: "Facturación",
//   //       component: (modalId: string, onClose: () => void) => <FacturacionView modalId={modalId} onClose={onClose} />,
//   //     },

//   //     facturacionPedido: {
//   //       key: "show-facturacion-pedido",
//   //       title: "Facturación",
//   //       component: <FacturacionPedidoView />,
//   //     },

//   //     parametrosFE: {
//   //       key: "show-parametrosFE",
//   //       title: "Parámetros FE",
//   //       component: (modalId: string, onClose: () => void) => <ParametrosFEView modalId={modalId} onClose={onClose} />,
//   //     },

//   //     notaPedido: {
//   //       key: "show-nota-pedido",
//   //       title: "Nota de Pedido",

//   //       component: (modalId: string, onClose: () => void) => <NotaPedidoView modalId={modalId} onClose={onClose} />,
//   //     },
//   //     notaCredito: {
//   //       key: "show-nota-credito",
//   //       title: "Nota de Crédito",
//   //       component: (modalId: string, onClose: () => void) => <NotaCreditoView modalId={modalId} onClose={onClose} />,
//   //     },
//   //     // cobranza
//   //     cobranzaCredito: {
//   //       key: "show-cobranza-credito",
//   //       title: "Cobranza Crédito",
//   //       component: <CobCreditoView />,
//   //     },
//   //     // caja
//   //     movimientoCaja: {
//   //       key: "show-movimiento-caja",
//   //       title: "Movimiento de Caja",
//   //       component: <MovimientoCajaView />,
//   //     },
//   //     // stock
//   //     ajusteStock: {
//   //       key: "show-ajuste-stock",
//   //       title: "Ajuste de Stock",
//   //       component: <AjusteStockView />,
//   //     },

//   //     playground: {
//   //       key: "show-playground",
//   //       title: "Playground",
//   //       component: <PlaygroundView />,
//   //     },
//   //   };

//   // console.log(openModals);

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Tab") {
//       e.preventDefault();
//     }
//   });

//   // Efecto para cerrar modal con escape
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Si algún modal 2 o modal 3 hizo preventDefault(), aquí defaultPrevented === true
//       if (e.key === "Escape" && !e.defaultPrevented) {
//         if (openModals.length === 0) return;
//         setOpenModals((prev) => prev.slice(0, -1)); // cierra el modal de nivel 1
//       }
//     };
//     // este listener va en modo “bubble” (no capture)
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [openModals]);

//   useEffect(() => {
//     const modalHandlers = Object.entries(modalConfig).reduce(
//       (handlers, [configKey, modal]) => {
//         handlers[modal.key] = () => openModalOnTop(configKey);
//         return handlers;
//       },
//       {} as Record<string, () => void>,
//     );

//     for (const [event, handler] of Object.entries(modalHandlers)) {
//       window.electron?.ipcRenderer?.on(event, handler);
//     }
//     return () => {
//       for (const [event, handler] of Object.entries(modalHandlers)) {
//         window.electron?.ipcRenderer?.removeListener(event, handler);
//       }
//     };
//   }, []);

//   // useEffect(() => {
//   //   const handleKeyDown = (event: KeyboardEvent) => {
//   //     if (event.key === "Escape" && openModals.length > 0) {
//   //       setOpenModals((prev) => {
//   //         if (prev.length === 0) return prev;
//   //         return prev.slice(0, -1);
//   //       });
//   //     }
//   //   };

//   //   window.addEventListener("keydown", handleKeyDown);
//   //   return () => {
//   //     window.removeEventListener("keydown", handleKeyDown);
//   //   };
//   // }, [openModals]);

//   function openModalOnTop(type: string) {
//     setOpenModals((prev) => {
//       //  const existing = prev.find((m) => m.type === type);
//       // if (existing) {
//       //   return [...prev.filter((m) => m.type !== type), existing];
//       // }
//       const newModal: OpenModal = { id: nextId.current++, type };
//       return [...prev, newModal];
//     });
//   }

//   function bringModalToFront(id: number) {
//     setOpenModals((prev) => {
//       const modal = prev.find((m) => m.id === id);
//       if (!modal) return prev;
//       // Mueve el modal al final del array (último = encima)
//       return [...prev.filter((m) => m.id !== id), modal];
//     });
//   }

//   return (
//     <ModalProvider>
//       <div className="flex flex-col justify-between min-h-screen bg-layout">
//         <div className="flex w-full flex-col overflow-hidden z-10">
//           <Outlet />
//         </div>

//         {openModals.map((modal, idx) => {
//           const zIndex = 50 + idx;
//           const modalData = modalConfig[modal.type];
//           if (!modalData) return null;

//           return (
//             <Modal
//               key={modal.id}
//               isOpen
//               title={modalData.title}
//               zIndex={zIndex}
//               onClose={() => setOpenModals((prev) => prev.filter((m) => m.id !== modal.id))}
//               onFocus={() => bringModalToFront(modal.id)}
//             >
//               {typeof modalData.component === "function"
//                 ? modalData.component(modal.id, () => setOpenModals((prev) => prev.filter((m) => m.id !== modal.id)))
//                 : modalData.component}

//               {/* {modalData.component(modal?.id)} */}
//             </Modal>
//           );
//         })}

//         <footer className="fixed bottom-0 flex items-center justify-around w-full h-5 px-4 text-white text-xs bg-gray-800 z-[1000]">
//           <div>Barra de Estado</div>
//           <div>Procesos: 0</div>
//         </footer>
//       </div>
//     </ModalProvider>
//   );
// }
