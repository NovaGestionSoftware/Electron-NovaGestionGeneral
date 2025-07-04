import apiNoAuth from "@renderer/frontend-resources/electron/lib/axiosNoAuth";
import apiPhp from "@renderer/frontend-resources/electron/lib/axiosPhp";
// import axios from 'axios';

export async function loginEmpresa(formData) {
  try {
    const { data } = await apiNoAuth.post("/login_empresa", formData);

    localStorage.setItem("_u", String(data.usuario));
    localStorage.setItem("_tu", String(data.tusuario));
    localStorage.setItem("_e", data.empresa);
    localStorage.setItem("_nu", data.nfantasia);
    localStorage.setItem("_le", data.logoemp);
    localStorage.setItem("_ln", data.logonova);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// export async function loginEmpresa(formData) {
//   try {
//     const payload = {
//       _e: formData.empresa,
//       _m: "homo",
//       _u: formData.usuario,
//       _p: formData.password,
//     };

//     const query = JSON.stringify(payload);

//     const baseUrl = import.meta.env.VITE_PHP_URL;
//     const url = `${baseUrl}/loginEmpresa.php?i=${query}`;

//     const { data } = await apiPhp(url);
//     console.log(data);

//     localStorage.setItem("_u", String(data.data[0].USUARIO));
//     localStorage.setItem("_tu", String(data.data[0].TUSUARIO));
//     localStorage.setItem("_e", data.data[0].EMPRESA);
//     localStorage.setItem("_nu", data.data[0].NFANTASIA);
//     localStorage.setItem("_le", data.data[0].LOGOEMP);
//     localStorage.setItem("_ln", data.data[0].LOGONOVA);

//     return data.data[0];
//   } catch (error) {
//     console.log(error);
//   }
// }
