// import "antd/dist/reset.css";
import React from 'react';
import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';
import { BrowserRouter } from "react-router-dom";
import ApplicationRouter from "./AplicationRouter";
import AuthContextProvider from "./context/AuthContext";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <StyleProvider layer hashPriority="high">
      <AuthContextProvider>
        <BrowserRouter>
          <React.Suspense fallback={null}>
            <AppLayout>
              <ApplicationRouter />
            </AppLayout>
          </React.Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    </StyleProvider>
  );
}

export default App;
