"use client";
import { Form, Row, Col, Input, Button, Typography } from "antd";
import { useLoginMutation } from "data/api/services/authServices";
import { useAppDispatch } from "data/api/services/hooks";
import { setCredentials } from "app/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { pushApiNotification } from "lib/helpers/notificationsHelper";

interface BackendError {
  status: number;
  data: {
    message: string;
    error: string;
    statusCode: number;
  };
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const result = await login(values).unwrap();
      localStorage.setItem("token", result.token);
      dispatch(setCredentials({ token: result.token, user: result.user }));
      if (result.userInfo) {
        pushApiNotification({
          state: "success",
          message: "Sucesso ao fazer login.",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      const errResponse = err as BackendError;
      const errMessage =
        errResponse?.data?.message ||
        "Login falhou. Confira suas credenciais novamente ou tente mais tarde.";
      if (errResponse.status == 401)
        pushApiNotification({ state: "error", message: errMessage });
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
                warningOnly: true,
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
                warningOnly: true,
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
