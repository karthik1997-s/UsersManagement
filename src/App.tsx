import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setupAxiosInterceptor } from "./services/apiInterceptor";
import { ConfigProvider, App as AntdApp } from "antd";


function App() {
  const queryClient = new QueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptor(navigate);
  }, [navigate]);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3C83F6", // 🔴 change primary color here
          },
        }}
      >
         <AntdApp>

        
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </>
  );
}

export default App;
