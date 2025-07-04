import "./assets/main.css";

import ReactDOM from "react-dom/client";
import Router from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {/* <div className="flex items-center justify-center bg-portal h-screen">
      <h1 className="text-2xl font-bold">Hola MUNDO!</h1>
    </div> */}
    <Router />
  </>,
);
