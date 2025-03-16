"use client";
import { Col, Row, Space } from "antd";
import Page from "lib/components/Page";
import { useSession } from "next-auth/react";
import { logout } from "./logoutAction";
import { pushApiNotification } from "lib/helpers/notificationsHelper";
import FaturamentoTotalizador from "./components/FaturamentoTotalizador";
import GraficoPedidosPorTempo from "./components/GraficoPedidosPorTempo";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    pushApiNotification({
      state: "success",
      message: "Logout realizado com sucesso!",
    });

    await logout();
  };

  // {!session && status !== "loading" && (
  //   <h1>Usuario nao esta autenticado.</h1>
  // )}

  return (
    <Page
      title="Dashboard"
      loggedUser={session?.user?.username}
      action={{
        label: "Sair",
        action: handleLogout,
      }}
    >
      <Row justify={"center"} style={{ display: "flex", width: "100%" }}>
        <Col span={24}>
          {status === "loading" && (
            <h1>carregando informacoes do usuario...</h1>
          )}
          <Space
            direction="vertical"
            size="small"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col sm={10} md={18} lg={20} xl={24}>
              <FaturamentoTotalizador />
            </Col>
            <Col xs={20} sm={24} md={20} lg={24} xl={24}>
              <GraficoPedidosPorTempo />
            </Col>
          </Space>
        </Col>
      </Row>
    </Page>
  );
}
