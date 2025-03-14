import axios from "axios";

type AppExternalConfig = {
  CLIENT_ID: string;
  FRONTEND_INDEX: string;
  AUTH_SERVER_URL: string;
  loaded: boolean;
  CONTEXT: string;
  RECAPTCHA_KEY: string;
};

export let ExternalConfig: AppExternalConfig = {
  CLIENT_ID: "",
  AUTH_SERVER_URL: "",
  FRONTEND_INDEX: "",
  loaded: false,
  CONTEXT: "/creatorsfy",
  RECAPTCHA_KEY: "",
};

// Interceptor de requisição
axios.interceptors.request.use(
  (request) => {
    // Importante retornar a requisição para que ela continue
    return request;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Erro na resposta:", error.response || error);
    return Promise.reject(error);
  }
);

export function loadExternalConfig() {
  ExternalConfig = {
    ...ExternalConfig,
    CLIENT_ID: "CREATORSFY",
    AUTH_SERVER_URL: "http://localhost:8443",
    FRONTEND_INDEX: "http://localhost:3000",
    loaded: true,
    RECAPTCHA_KEY: "rk",
  };
}
