import axios from "axios";
import { LoginRequest, SignupRequest } from "../api/auth";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/auth",
});

export const signup = (data: SignupRequest) =>
  API.post("/signup", data);

export const login = (data: LoginRequest) =>
  API.post("/login", data);