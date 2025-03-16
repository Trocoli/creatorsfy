import { ConfigProvider, Divider, Layout, Typography } from "antd";
import React from "react";
import NotificationsManager from "../NotificationManager";
import CustomHeader from "../CustomHeader";
import { CustomHeaderProps } from "../CustomHeader";
import Container from "../Container";

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
} & CustomHeaderProps;

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "transparent",
  width: "100%",
};

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
  height: "100vh",
};

export default function Page({
  children,
  title,
  action,
  loggedUser,
}: PageProps) {
  const contentStyle: React.CSSProperties = {
    display: "flex",
    justifyItems: "center",
    alignItems: "start",
    width: "100%",
    marginTop: 2,
  };

  // # implementar loading state
  // # set Header logout options
  const { Content, Footer } = Layout;
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadiusLG: 20,
          },
          Card: {
            boxShadow: "5",
            colorBgContainer: "#f2f2f2",
            lineType: "solid",
            lineWidth: 0.5,
            colorBorderSecondary: "#8FF3B1",
            colorPrimaryBorderHover: "#000000",
            bodyPadding: 25,
          },
        },
        token: {
          fontFamily: "var(--font-geist-mono)",
          colorBgLayout: "#fafaf9",
          colorText: "#1b1b1b",
          colorBgBase: "#f2f2f2",
          colorPrimary: "#00be43",
          colorHighlight: "#00be43",
          colorInfo: "#e54f6d",
        },
      }}
    >
      <Layout style={layoutStyle}>
        <CustomHeader action={action} loggedUser={loggedUser} />
        {title && <Divider style={{ borderColor: "#666666", marginTop: 0 }} />}
        <Typography style={titleStyle}>{title}</Typography>
        <Content style={contentStyle}>
          <NotificationsManager />
          <Container fluid="xl" flex column grow>
            {children}
          </Container>
        </Content>
        <Footer style={footerStyle}>@Creatorsfy</Footer>
      </Layout>
    </ConfigProvider>
  );
}
