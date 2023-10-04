import { BrowserRouter } from "react-router-dom";
import { Routes } from "@src/routes";

function App() {
  window.userRole = null;

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
