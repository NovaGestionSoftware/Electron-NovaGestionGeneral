import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginEmpresa } from "@renderer/views/auth/services/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValues = {
    empresa: "",
    usuario: "",
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

  const { mutate } = useMutation({
    mutationFn: loginEmpresa,
    onError: (error) => {
      console.log(error.message);
      setLoading(false);
      setError("Hubo un error. Revisa tus credenciales");
      setTimeout(() => {
        setError("");
      }, 3000);
    },
    onSuccess: (data) => {
      //console.log(data);

      // localStorage.setItem("_u", String(data.USUARIO));
      // localStorage.setItem("_tu", String(data.TUSUARIO));
      // localStorage.setItem("_e", data.EMPRESA);
      // localStorage.setItem("_nu", data.NFANTASIA);
      // localStorage.setItem("_le", data.LOGOEMP);
      // localStorage.setItem("_ln", data.LOGONOVA);
      // localStorage.setItem('_dbp', data.dbnameprod);
      // localStorage.setItem('_dbd', data.dbnamedev);

      window.electron.ipcRenderer.send("login-success");

      // Establecer un retraso en la navegación
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    },
  });

  const handleForm = (formData) => {
    // console.log(formData);
    // setLoading(true);
    mutate(formData);
  };

  useEffect(() => {
    // Poner el foco en el primer input cuando el componente se monta o al regresar
    const firstInput = document.getElementById("empresa");
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
            document.getElementById("empresa")?.focus(); // Si el formulario no es válido, vuelve al inicio
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

  return (
    <main className="flex items-center justify-center">
      <form
        className="flex h-auto w-[20rem] flex-col items-center justify-center space-y-6 border-0 bg-transparent px-2 py-4"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div>
          {/* Error Message */}
          {error && (
            <div
              className="absolute w-2/4 bg-red-600 border-2 border-red-700 text-gray-300 text-center text-[10px] mb-2"
              style={{ top: "150px", left: "50%", transform: "translateX(-50%)" }}
            >
              {error}
            </div>
          )}
          <div className="mt-2">
            <label htmlFor="empresa" className="block text-sm font-semibold te">
              Empresa
            </label>
            <input
              id="empresa"
              {...register("empresa", { required: true })}
              className="mt-1 block w-full rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
              type="number"
              placeholder="N° de empresa"
              onKeyDown={(event) => goToNextInput(event, "usuario")}
              onFocus={handleFocus}
            />
          </div>

          <div className="mt-2">
            <label htmlFor="usuario" className="block text-sm font-semibold ">
              Usuario
            </label>
            <input
              id="usuario"
              className="mt-1 block w-full rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
              type="text"
              placeholder="Nombre de Usuario"
              onKeyDown={(event) => goToNextInput(event, "password")}
              {...register("usuario", { required: true })}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block text-sm font-semibold ">
              Contraseña
            </label>
            <input
              id="password"
              className="mt-1 block w-full rounded border bg-gray-50 px-2 py-1 text-gray-600 shadow-lg outline-gray-600 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-2 focus:outline-sky-500"
              type="password"
              placeholder="*************"
              onKeyDown={(event) => goToNextInput(event, "submit")}
              onKeyPress={handleKeyPress}
              {...register("password", { required: true })}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`block w-3/4 py-3 transform rounded border-[1px] px-4 font-bold tracking-wider text-white shadow-lg transition-all ${
            loading
              ? "flex justify-center items-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 cursor-progress"
              : isFormValid
                ? "bg-emerald-700 border-emerald-700 cursor-pointer hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500 focus:border-transparent focus:bg-blue-500 focus:outline-2 focus:outline-blue-500"
                : "bg-gray-400 border-gray-400 cursor-default" // Estilos para cuando el botón está deshabilitado
          }`}
          disabled={!isFormValid} // El botón se deshabilita si los campos no están completos
        >
          {loading ? <ClipLoader color="#fff" size={24} /> : "Ingresar"}
        </button>
      </form>
    </main>
  );
}
