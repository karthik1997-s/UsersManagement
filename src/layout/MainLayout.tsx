import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";



const MainLayout: React.FC = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="mx-auto w-full overflow-x-auto p-8">
          <Outlet />
        </div>
      </div>
    );
  };

export default MainLayout;
