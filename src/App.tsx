import { BrowserRouter } from "react-router-dom";
import { Routes } from "@src/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssVarsProvider, useTheme } from "@mui/joy";

function App() {
  const theme = useTheme();
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
