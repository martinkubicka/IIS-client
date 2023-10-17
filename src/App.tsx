import { BrowserRouter } from "react-router-dom";
import { Routes } from "@src/routes";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
