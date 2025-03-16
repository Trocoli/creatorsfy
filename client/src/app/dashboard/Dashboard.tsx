"use client";
import { Col, Row, Space } from "antd";
import Page from "lib/components/Page";
import { useSession } from "next-auth/react";
import { logout } from "./logoutAction";
import { pushApiNotification } from "lib/helpers/notificationsHelper";
import FaturamentoTotalizador from "./components/FaturamentoTotalizador";
import GraficoPedidosPorTempo from "./components/GraficoPedidosPorTempo";
import PedidosListagem from "./components/PedidosListagem";

export default function DashboardPage() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.log("error logging out");
    } finally {
      pushApiNotification({
        state: "success",
        message: "Logout realizado com sucesso!",
      });
    }
  };

  return (
    <Page
      title="Dashboard"
      loggedUser={session?.user?.username}
      action={{
        label: "Sair",
        action: handleLogout,
      }}
    >
      <Row justify={"center"}>
        <Col xs={20} sm={20} md={18} lg={16} xl={12}>
          <Space
            size={"middle"}
            direction="vertical"
            className="w-full flex justify-center"
          >
            <Row>
              <Col span={24}>
                <FaturamentoTotalizador />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <GraficoPedidosPorTempo />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <PedidosListagem />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Page>
  );
}
