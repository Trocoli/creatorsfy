"use server";
import { signIn } from "app/auth";

export const loginAction = async (values: {
  username: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (res?.error) {
      return {
        state: "error",
        message:
          "Nome de usuário ou senha inválidos, verifique suas credenciais e tente novamente.",
      };
    } else {
      return {
        state: "success",
        message: "Sucesso ao fazer login.",
      };
    }
  } catch (err) {
    console.error("SignIn threw an error =>", err);
    return {
      state: "error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    };
  }
};
