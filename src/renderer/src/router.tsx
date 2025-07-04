import { HashRouter, Route, Routes } from "react-router-dom";
import Portal from "./views/components/Layout";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portal />} index />
      </Routes>
    </HashRouter>
  );
}
