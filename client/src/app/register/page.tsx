"use client";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import Page from "lib/components/Page";
import Link from "next/link";

export default function Regsiter() {
  return (
    <Page title="Crie sua conta">
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={20} md={10} xl={8}>
          <Form
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
                <Button type="primary" style={{ width: "100%" }}>
                  Enviar
                </Button>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col style={{ marginTop: 10 }}>
                <Typography>
                  Já possui uma conta? faca o{" "}
                  <Link href={"/login"}>
                    <Button type="link" size="small">
                      login
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
