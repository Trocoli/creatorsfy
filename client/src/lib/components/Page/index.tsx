import { ConfigProvider, Divider, Layout, Typography } from "antd";
import React from "react";

export interface PageProps {
  title?: string;
  children?: React.ReactNode;
}

const headerStyle: React.CSSProperties = {
  alignSelf: "start",
  fontSize: "2rem",
  backgroundColor: "transparent",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  marginTop: 2,
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
  width: "100%",
};

const Page: React.FC<PageProps> = ({ children, title }) => {
  // # implementar loading state
  // # set Header logout options
  const { Header, Content, Footer } = Layout;
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-geist-mono)",
          colorBgLayout: "#fafaf9",
          colorText: "#1b1b1b",
          colorBgBase: "#f2f2f2",
          colorPrimary: "#00be43",
          colorHighlight: "#00be43",
          colorInfo: "#e54f6d",
        },
        components: {
          Button: {
            borderRadiusLG: 20,
          },
        },
      }}
    >
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Creatorsfy. </Header>
        {title && <Divider style={{ borderColor: "#666666" }} />}
        <Typography style={titleStyle}>{title}</Typography>
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>@Creatorsfy</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;
