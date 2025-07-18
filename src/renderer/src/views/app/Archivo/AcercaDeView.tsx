import { ActionButton, FlexibleInputField } from "@renderer/frontend-resources/components";
import React, { ReactNode, useEffect, useState } from "react";
import logoNova from "@renderer/frontend-resources/assets/logos/novalogo-normal.png";
import { calendario, cloudRefresh, salir } from "@renderer/frontend-resources/assets/icons";
import { getCuit, getNombreEmpresa } from "@renderer/frontend-resources/electron/utils/appInfo";

interface ViewProps {
  modalId: string;
  onClose: () => void;
}

interface InputField {
  label: string;
  inputType?: "number" | "textarea" | "text" | "select" | "tel" | "email" | "date" | "checkbox" | undefined;
  inputWidth?: string;
  containerClassName?: string;
  labelWidth?: string;
  inputClassName?: string;
  value: string;
  onChange: (value: string) => void;
  rightComponent?: ReactNode;
}

export default function AcercaDeView({ modalId, onClose }: ViewProps) {
  const cuit = getCuit();
  const nombreEmpresa = getNombreEmpresa();
  const [inputVentasP, setInputVentasP] = useState("");
  const [inputVersionTesoreria, setInputVersionTesoreria] = useState("");
  const [inputVersionCentralizador, setInputVersionCentralizador] = useState("");
  const [inputVersionNvSinapsis, setInputVersionNvSinapsis] = useState("");

  const [inputEmpresa, setInputEmpresa] = useState(nombreEmpresa);
  const [inputEquipo, setInputEquipo] = useState("");
  const [inputCuit, setInputCuit] = useState(cuit);
  const [inputUsuario, setInputUsuario] = useState("");

  const [inputVersionWindows, setInputVersionWindows] = useState("");
  const [inputVersionRuntimes, setInputVersionRuntimes] = useState("");

  const [inputIpLocal, setInputIpLocal] = useState("");
  const [inputIpPublica, setInputIpPublica] = useState("");

  const [inputUrl, setInputUrl] = useState("");
  const [inputBD, setInputBD] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  const Inputs1: InputField[] = [
    {
      label: "Ventas P. (05/1)",
      value: inputVentasP,
      onChange: (value) => setInputVentasP(value),
    },
    {
      label: "Versión Tesorería:",
      value: inputVersionTesoreria,
      onChange: (value) => setInputVersionTesoreria(value),
    },
    {
      label: "Versión Centralizador:",
      value: inputVersionCentralizador,
      onChange: (value) => setInputVersionCentralizador(value),
    },
    {
      label: "Versión NvSinapsis:",
      value: inputVersionNvSinapsis,
      onChange: (value) => setInputVersionNvSinapsis(value),
    },
  ];

  const Inputs2: InputField[] = [
    {
      label: "Empresa",
      value: inputEmpresa,
      onChange: (value) => setInputEmpresa(value),
      inputWidth: "w-80",
    },
    {
      label: "Equipo",
      value: inputEquipo,
      onChange: (value) => setInputEmpresa(value),
      inputWidth: "w-62",
    },
  ];

  const Inputs3: InputField[] = [
    {
      label: "CUIT",
      value: inputCuit,
      onChange: (value) => setInputCuit(value),
      inputWidth: "w-62",
    },
    {
      label: "Usuario",
      value: inputUsuario,
      onChange: (value) => setInputUsuario(value),
      inputWidth: "w-62",
    },
  ];

  const Inputs4: InputField[] = [
    {
      label: "Versión Windows",
      value: inputVersionWindows,
      onChange: (value) => setInputVersionWindows(value),
      inputWidth: "w-48.5",
    },
    {
      label: "Versión Runtimes",
      value: inputVersionRuntimes,
      onChange: (value) => setInputVersionRuntimes(value),
      inputWidth: "w-48.5",
    },
  ];

  const Inputs5: InputField[] = [
    {
      label: "IP Local",
      value: inputIpLocal,
      onChange: (value) => setInputIpLocal(value),
      inputWidth: "w-35",
      rightComponent: (
        <ActionButton onClick={() => handleCopy(inputIpLocal)} text="Copiar" size="sm" addClassName="h-8 w-18" />
      ),
    },
    {
      label: "IP Pública",
      value: inputIpPublica,
      onChange: (value) => setInputIpPublica(value),
      inputWidth: "w-35",
      rightComponent: (
        <ActionButton onClick={() => handleCopy(inputIpPublica)} text="Copiar" size="sm" addClassName="h-8 w-18" />
      ),
    },
  ];

  const Inputs6: InputField[] = [
    {
      label: "URL",
      value: inputUrl,
      onChange: (value) => setInputUrl(value),
      inputWidth: "w-156",
    },
    {
      label: "DB",
      value: inputBD,
      onChange: (value) => setInputBD(value),
      inputWidth: "w-42",
    },
    {
      label: "User",
      value: inputUser,
      onChange: (value) => setInputUser(value),
      inputWidth: "w-42",
    },
    {
      label: "Pass",
      value: inputPass,
      onChange: (value) => setInputPass(value),
      inputWidth: "w-42",
    },
  ];

  useEffect(() => {
    window.electron.ipcRenderer.invoke("get-system-info").then((data) => {
      //  console.log(data);
      setInputEquipo(data?.hostname);
      setInputUsuario(data?.username);
      setInputVersionWindows(data?.windowsVersion);
      setInputVersionRuntimes(data?.runtimes?.electron);
      setInputIpLocal(data?.localIP);
      setInputIpPublica(data?.publicIP);
    });
  }, []);

  function handleCopy(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log("Copiado al portapapeles:", value);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  }

  return (
    <div className="w-[700px]">
      <div className="relative flex items-center flex-col p-4 bg-white rounded-b-md">
        <h4 className="text-xl font-bold mb-4">Sistema Integrado de Administración y Ventas</h4>
        {/* boton cerrar */}
        <div className="absolute right-1 top-1">
          <ActionButton
            icon={<img src={salir} alt="close" className={`h-8 w-8 ml-0.5 drop-shadow-lg`} />}
            onClick={onClose}
            addClassName="h-12 w-12"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <img src={logoNova} className="w-32 h-32" alt="logo" />
            <img src={cloudRefresh} className="w-12 h-12 ml-6" alt="logo" />
          </div>
          {/* columna Inputs 1 */}
          <div className="flex flex-col gap-2">
            {Inputs1.map((field, index) => (
              <FlexibleInputField
                key={index}
                label={field.label}
                inputType="text"
                value={field.value}
                onChange={field.onChange}
                inputWidth="w-36"
                labelWidth="155px"
                disabled
              />
            ))}
          </div>
          {/* fila Inputs 2 y 3 */}
          <div className="flex flex-col items-center gap-2">
            <ActionButton text="Detalle" addClassName="h-9 w-18" onClick={() => {}} size="sm" color={"gray"} />
            <ActionButton
              icon={<img src={calendario} alt="cancel" className="h-8 w-8 drop-shadow-lg" />}
              addClassName="h-15 w-15"
              onClick={() => {}}
              size="sm"
              color={"gray"}
            />
          </div>
        </div>
        {/* fila Inputs 3 */}
        <div className="relative flex flex-col py-2 w-full">
          <div className="absolute right-0 top-0">
            <ActionButton onClick={() => handleCopy(inputEquipo)} text="Copiar" size="sm" addClassName="h-8 w-18" />
          </div>
          <div className="flex justify-between">
            {Inputs2.map((field, index) => (
              <FlexibleInputField
                key={index}
                label={field.label}
                inputType="text"
                value={field.value}
                onChange={field.onChange}
                inputWidth={field.inputWidth}
                labelAlign="left"
                containerWidth="0px"
                stacked
                disabled
              />
            ))}
          </div>

          <div className="flex justify-between mt-2">
            {Inputs3.map((field, index) => (
              <FlexibleInputField
                key={index}
                label={field.label}
                inputType="text"
                value={field.value}
                onChange={field.onChange}
                inputWidth={field.inputWidth}
                labelAlign="left"
                containerWidth="0px"
                stacked
                disabled
              />
            ))}
          </div>
        </div>
        {/* fila Inputs 4*/}
        <div className="flex justify-between gap-2 w-full border-t p-2">
          {Inputs4.map((field, index) => (
            <FlexibleInputField
              key={index}
              label={field.label}
              inputType="text"
              labelWidth="120px"
              value={field.value}
              onChange={field.onChange}
              inputWidth={field.inputWidth}
              labelAlign="left"
              containerWidth="0px"
              disabled
            />
          ))}
        </div>
        {/* fila Inputs 5*/}
        <div className="flex justify-between w-full border-t p-2">
          {Inputs5.map((field, index) => (
            <FlexibleInputField
              key={index}
              label={field.label}
              labelWidth="65px"
              inputType="text"
              value={field.value}
              onChange={field.onChange}
              inputWidth={field.inputWidth}
              labelAlign="left"
              containerWidth="0px"
              rightComponent={field.rightComponent}
              disabled
            />
          ))}
        </div>
        {/* fila Inputs 6 */}
        <div className="flex flex-wrap justify-between w-full gap-2 border-t pt-2 px-1">
          <ActionButton onClick={() => {}} text="Leer Host" size="sm" />
          {Inputs6.map((field, index) => (
            <FlexibleInputField
              key={index}
              label={field.label}
              labelWidth="25px"
              inputType="text"
              value={field.value}
              onChange={field.onChange}
              inputWidth={field.inputWidth}
              labelAlign="left"
              containerWidth="0px"
              disabled
            />
          ))}
        </div>
      </div>
    </div>
  );
}
