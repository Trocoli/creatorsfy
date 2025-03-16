"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { pushApiNotification } from "lib/helpers/notificationsHelper";
import { Form, Row, Col, Input, Button, Typography } from "antd";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    let loginSuccess = false;
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      setIsLoading(false);
      if (res?.error) {
        pushApiNotification({
          state: "error",
          message:
            "Nome de usuário ou senha inválidos, verifique suas credenciais e tente novamente.",
        });
      } else {
        loginSuccess = true;
      }
    } catch (err) {
      setIsLoading(false);
      console.error("SignIn threw an error =>", err);
      pushApiNotification({
        state: "error",
        message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      });
    } finally {
      if (loginSuccess) {
        router.push("/dashboard");
        pushApiNotification({
          state: "success",
          message: "Sucesso ao fazer login.",
        });
      }
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      size="large"
      style={{ justifyContent: "center" }}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            name="username"
            label="Nome de usuário"
            rules={[
              {
                required: true,
                message: "Nome de usuário obrigatório!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name={"password"}
            label={"Senha"}
            rules={[
              {
                required: true,
                message: "Senha obrigatória!",
                whitespace: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"} style={{ marginTop: 4 }}>
        <Col span={8}>
          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col style={{ marginTop: 10 }}>
          <Typography>
            Não possui uma conta?
            <Link href={"/register"}>
              <Button type="link" size="small">
                Registre-se
              </Button>
            </Link>
          </Typography>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
