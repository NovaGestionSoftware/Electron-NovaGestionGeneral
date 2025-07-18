import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CiUser } from "react-icons/ci";
import { ActionButton } from "@renderer/frontend-resources/components";
import { loginEmpresa } from "@renderer/services/axiosLogin";

export default function LoginForm({
  setLogin,
  setDataLogin,
  empresaID,
  handleClose,
  handleCloseModal,
  usuariosEmpresa,
  handleOpenModal,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValues = {
    empresa: String(Number(empresaID)),
    usuario: usuariosEmpresa[0].value,
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const isFormValid = isDirty && isValid && !loading;

  const userOptions = [
    {
      value: "nova",
      userName: "Admin",
    },
    {
      value: "pamela",
      userName: "Pamela Gonzalez",
    },
  ];

  const { mutate } = useMutation({
    mutationFn: loginEmpresa,
    onError: (error) => {
      console.log(error.message);
      window?.electron?.ipcRenderer?.invoke("show-native-alert", {
        type: "error",
        title: "Sistema de Ventas",
        message: "El usuario o la contraseña no son correctos. Inténtalo de nuevo.",
      });
      setLoading(false);
      // setError("Hubo un error. Revisa tus credenciales");
      setTimeout(() => {
        setError("");
      }, 3000);
    },
    onSuccess: (data) => {
      if (data) {
        // console.log(data);
        console.log(data);
        setDataLogin(data[0]);
        console.log("login success");
        handleCloseModal();
        handleOpenModal("empresaModal");
      }

      // localStorage.setItem("_u", String(data.USUARIO));
      // localStorage.setItem("_tu", String(data.TUSUARIO));
      // localStorage.setItem("_e", data.EMPRESA);
      // localStorage.setItem("_nu", data.NFANTASIA);
      // localStorage.setItem("_le", data.LOGOEMP);
      // localStorage.setItem("_ln", data.LOGONOVA);
      // localStorage.setItem('_dbp', data.dbnameprod);
      // localStorage.setItem('_dbd', data.dbnamedev);

      // window.electron.ipcRenderer.send("login-success");
      // Establecer un retraso en la navegación
      // setTimeout(() => {
      //   navigate("/home");
      // }, 1000);
    },
  });

  const handleForm = (formData) => {
    mutate(formData);
  };

  useEffect(() => {
    // Poner el foco en el primer input cuando el componente se monta o al regresar
    const firstInput = document.getElementById("usuario");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const goToNextInput = (event, nextInputId) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (nextInputId === "submit") {
        setTimeout(() => {
          if (isFormValid) {
            handleSubmit(handleForm)();
          } else {
            document.getElementById("usuario")?.focus(); // Si el formulario no es válido, vuelve al inicio
          }
        }, 0);
      } else {
        document.getElementById(nextInputId)?.focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isFormValid) {
      handleSubmit(handleForm)(); // Solo permite el submit si el formulario es válido
    }
  };

  const handleFocus = () => {
    const firstInput = document.getElementById("empresa");
    if (firstInput) {
      firstInput.focus();
    }
  };
  function handleCerrarSesion() {
    handleClose();
    handleCloseModal();
  }

  return (
    <main className="flex flex-col">
      <form
        className="relative flex h-auto w-full justify-center space-y-6 border-0 bg-transparent px-2"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        {/* imagen */}
        <div className="mt-4">
          <div className="flex justify-center items-center h-40 w-40 shadow border border-gray-300 rounded-md">
            <CiUser className="h-12 w-12" color="gray" />
          </div>
        </div>

        <div className="p-4">
          <div className="m-1 space-y-3">
            {/* Error Message */}
            {error && (
              <div
                className="absolute w-2/4 bg-red-600 border-2 border-red-700 text-gray-300 text-center text-[10px] mb-2"
                style={{ top: "150px", left: "50%", transform: "translateX(-50%)" }}
              >
                {error}
              </div>
            )}
            {/* <div className="flex items-center mt-2 gap-2">
              <label htmlFor="empresa" className="w-18 text-right block text-sm font-semibold">
                Empresa
              </label>
              <input
                id="empresa"
                {...register("empresa", { required: true })}
                className="mt-1 block w-48 rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
                type="number"
                placeholder="N° de empresa"
                onKeyDown={(event) => goToNextInput(event, "usuario")}
                onFocus={handleFocus}
                disabled
              />
            </div> */}

            <div className="flex items-center mt-2 gap-2">
              <label htmlFor="usuario" className="w-18 text-right block text-sm font-semibold">
                Usuario
              </label>
              <select
                id="usuario"
                className="mt-1 block w-48 rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
                {...register("usuario", { required: true })}
                onKeyDown={(event) => goToNextInput(event, "password")}
                //defaultValue="nova"
              >
                {usuariosEmpresa.map((user, index) => (
                  <option key={index} value={user.usuario}>
                    {user?.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-2 gap-2">
              <label htmlFor="password" className="block text-sm font-semibold ">
                Contraseña
              </label>
              <input
                id="password"
                className="mt-1 block w-48 rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
                type="password"
                placeholder="*************"
                onKeyDown={(event) => goToNextInput(event, "submit")}
                onKeyPress={handleKeyPress}
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className={`w-48 py-2 rounded-lg font-semibold text-white shadow-md transition-all cursor-pointer ${
                loading
                  ? "flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600"
                  : isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:-translate-y-0.5"
                    : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              {loading ? <ClipLoader color="#fff" size={24} /> : "Ingresar"}
            </button>
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="cargo" className="block text-sm font-semibold">
              Cargo
            </label>
            <input
              id="cargo"
              className="block w-62 rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
              type="text"
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cargo" className="block text-sm font-semibold">
              Nivel de usuario
            </label>
            <input
              id="nivelUsuario"
              className="block w-62 rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
              type="text"
              disabled
            />
          </div>
        </div>
        <div className="absolute right-12 bottom-0">
          <ActionButton onClick={handleCerrarSesion} text="Cerrar Sesión" />
        </div>
      </div>
    </main>
  );
}
