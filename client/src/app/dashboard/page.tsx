"use client";
import { Flex, Space } from "antd";
import { selectUser } from "app/slices/authSlice";
import { useAppSelector } from "data/api/services/hooks";
import Page from "lib/components/Page";

export default function Dashboard() {
  const user = useAppSelector(selectUser);

  return (
    <Page title="Dashboard">
      <Flex>
        {user ? (
          <Space>
            <h1>{user?.username}</h1>
            <h1>{user?.store}</h1>
          </Space>
        ) : (
          <h1>Loading...</h1>
        )}
      </Flex>
    </Page>
  );
}
