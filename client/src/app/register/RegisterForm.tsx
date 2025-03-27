"use client";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import Page from "lib/components/Page";
import { pushApiNotification } from "lib/helpers/notificationsHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegsiterForm() {
  const router = useRouter();

  const onFinish = async (values: {
    username: string;
    password: string;
    store: string;
  }) => {
    try {
      const registerRes = await fetch("http://localhost:8181/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        throw new Error(registerData.message || "Erro ao registrar.");
      }
      router.push("/login");
      pushApiNotification({
        state: "success",
        message: "Registro concluído com sucesso.",
      });
    } catch (err) {
      pushApiNotification({
        state: "error",
        message:
          err instanceof Error ? err.message : "Erro inesperado ao registrar.",
      });
    }
  };

  return (
    <Page title="Crie sua conta">
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={20} md={10} xl={8}>
          <Form
            layout="vertical"
            size="large"
            style={{ justifyContent: "center" }}
            onFinish={onFinish}
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
              <Col span={24}>
                <Form.Item
                  name="store"
                  label="Nome da loja"
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
            </Row>
            <Row justify={"center"} style={{ marginTop: 4 }}>
              <Col span={8}>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Enviar
                </Button>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col style={{ marginTop: 10 }}>
                <Typography>
                  Já possui uma conta? faça o{" "}
                  <Link href={"/login"}>
                    <Button type="link" size="small">
                      Login
                    </Button>
                  </Link>
                </Typography>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
