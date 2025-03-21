"use client";
import { Col, Row, Space } from "antd";
import Page from "lib/components/Page";
import { useSession } from "next-auth/react";
import { logout } from "./logoutAction";
import { pushApiNotification } from "lib/helpers/notificationsHelper";
import FaturamentoTotalizador from "./components/FaturamentoTotalizador";
import GraficoPedidosPorTempo from "./components/GraficoPedidosPorTempo";
import PedidosListagem from "./components/PedidosListagem";
import { useGetOrdersByDateQuery } from "data/api/services/orderServices";
import { useAppSelector } from "data/api/services/hooks";
import {
  selectEndDate,
  selectInitialDate,
  selectLimit,
  selectPage,
} from "data/api/services/orderServices/OrderFilterSlice";

export default function DashboardPage() {
  const { data: session } = useSession();

  const initialDate = useAppSelector(selectInitialDate);
  const endDate = useAppSelector(selectEndDate);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const { data, isLoading } = useGetOrdersByDateQuery({
    initialDate,
    endDate,
    page,
    limit,
  });

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
                <FaturamentoTotalizador
                  totalAmount={data?.totalAmount ?? 0}
                  isLoading={isLoading}
                  initialDate={data?.firstDate}
                  finalDate={data?.lastDate}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <GraficoPedidosPorTempo
                  ordersByHour={data?.ordersByHour || []}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <PedidosListagem
                  orders={data?.orders}
                  isLoading={isLoading}
                  totalElements={data?.totalElements ?? 0}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Page>
  );
}
