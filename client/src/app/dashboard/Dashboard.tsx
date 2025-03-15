"use client";
import { Flex, Space } from "antd";
import Page from "lib/components/Page";
import { useSession } from "next-auth/react";
import { logout } from "./logoutAction";
import { pushApiNotification } from "lib/helpers/notificationsHelper";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    pushApiNotification({
      state: "success",
      message: "Logout realizado com sucesso!",
    });

    await logout(); // Calls the server action and redirects to login
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
      <Flex>
        {status === "loading" && <h1>carregando informacoes do usuario...</h1>}
        {!session && <h1>Usuario nao esta autenticado.</h1>}

        <Space>
          <h1>{session?.user?.username}</h1>
          <h1>{session?.user?.store}</h1>
        </Space>
      </Flex>
    </Page>
  );
}
