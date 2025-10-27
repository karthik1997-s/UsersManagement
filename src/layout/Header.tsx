import { App, Button } from "antd";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { removeToken } from "../utills/auth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  // : string;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const { message } = App.useApp(); 
  const navigate = useNavigate();
  const {mutate,isPending} = useMutation({
    mutationFn:logout
  })
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        console.log("res",res)
        if (res) {
          message.success("Logout successfully");
          navigate("/login")
          removeToken();
         
        }
      },
      onError: () => {
        message.error("Something went wrong");
      },
    });
  };
  
  return (
    <>
      <header className="px-8 py-3 shadow-sm bg-black sticky top-0 z-40">
        <div className=" flex items-center justify-end">
     
          <div className="flex items-center justify-center space-x-6">
            <span className="text-sm font-bold text-white">Elon Musk</span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              loading={isPending}
              className="!bg-red-500 !hover:bg-red-500  !text-white"
              onClick={handleLogout}
            ></Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
