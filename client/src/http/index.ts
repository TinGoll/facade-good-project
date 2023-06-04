import axios from "axios";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../settings/api.settings";

const API_URL = `${GATSBY_API_HOST}:${GATSBY_API_PORT}/api`

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
    //   Authorization: "Bearer token", // Замените "token" на ваш реальный токен авторизации
    },
  });
  
  export default $api;
  
  
  
  
  