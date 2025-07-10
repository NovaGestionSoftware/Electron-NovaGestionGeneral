import { getAppVersion, getEnvironment, getFormattedDate } from "../frontend-resources/electron/utils/appInfo";

window.addEventListener("DOMContentLoaded", () => {
  // Construir título
  const titulo = `NovaGestión v${getAppVersion()} ${getEnvironment()} \u2003 <${getFormattedDate()}> \u2003 <URL_DB> `;
  document.title = titulo;
});
