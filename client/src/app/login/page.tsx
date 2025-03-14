"use client";
import { Col, Row } from "antd";
import Page from "lib/components/Page";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Page title="Entre na sua conta">
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={20} md={10} xl={8}>
          <LoginForm />
        </Col>
      </Row>
    </Page>
  );
}
