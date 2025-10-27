import axios from "axios";
export const login = (data: any) => {
  return axios({ method: "POST", url: "/login", data: data });
};
export const logout = () => {
  return axios({ method: "POST", url: "/logout"});
};
