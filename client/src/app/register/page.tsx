"use client";
import { Col, Form, Input, Row } from "antd";
import Page from "lib/components/Page";

export default function Regsiter() {
  return (
    <Page title="Registre-se">
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={20} md={12}>
          <Form
            layout="vertical"
            size="large"
            style={{ justifyContent: "center" }}
          >
            <Form.Item
              name="username"
              label="Nome de usuário"
              tooltip="Digite o nome de usuário desejado"
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
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
