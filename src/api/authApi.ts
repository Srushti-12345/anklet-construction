import axios from "axios";
import { LoginRequest, SignupRequest } from "../api/auth";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/auth",
  withCredentials: true,
});

// export const refreshToken = () => {
//   return api.post("/refresh", {}, {
//     withCredentials: true,
//   });
// };

export const signup = (data: SignupRequest) =>
  API.post("/signup", data);

export const login = (data: LoginRequest) =>
  API.post("/login", data);

export const logout = () => 
  API.post("/logout");