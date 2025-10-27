import axios from "axios";

export const userList = (data: any) => {
    return axios({ method: "GET", url: "/users", params: data });
  };

  export const getUser = (data: any) => {
    return axios({ method: "GET", url: `/users/${data}`, });
  };
  export const createUser = (data: any) => {
    return axios({ method: "POST", url: `/users`,data:data });
  };
  export const deleteUser = (data: any) => {
    return axios({ method: "Delete", url: `/users/${data}`, });
  };
  export const updateUser = (data: any) => {
    return axios({ method: "Put", url: `/users/${data?.id}`,data:data?.data });
  };