"use client";
import { Col, Row, Space } from "antd";
import Page from "lib/components/Page";
import { useSession } from "next-auth/react";
import { logout } from "./logoutAction";
import { pushApiNotification } from "lib/helpers/notificationsHelper";
import FaturamentoTotalizador from "./components/FaturamentoTotalizador";
import GraficoPedidosPorTempo from "./components/GraficoPedidosPorTempo";
import { useRouter } from "next/navigation";
import PedidosListagem from "./components/PedidosListagem";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    pushApiNotification({
      state: "success",
      message: "Logout realizado com sucesso!",
    });

    await logout();
  };

  if (!session && status !== "loading") {
    router.push("/login");
  }

  // {!session && status !== "loading" && (
  //   <h1>Usuario nao esta autenticado.</h1>
  // )}

  // {status === "loading" && (
  //   <h1>carregando informacoes do usuario...</h1>
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
      <Row justify={"center"}>
        <Col xs={20} sm={20} md={16} lg={22} xl={22}>
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
