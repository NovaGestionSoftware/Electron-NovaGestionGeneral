import "./assets/main.css";

import ReactDOM from "react-dom/client";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <>
    {/* <div className="flex items-center justify-center bg-portal h-screen">
      <h1 className="text-2xl font-bold">Hola MUNDO!</h1>
    </div> */}
    <QueryClientProvider client={queryClient}>

    <Router />
    </QueryClientProvider>
  </>,
);
