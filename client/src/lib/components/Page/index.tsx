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
  color: "#7b8eb5",
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
  color: "#fff",
  backgroundColor: "transparent",
  width: "100%",
};

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
  height: "calc(100vh - 20px)",
  width: "100%",
  backgroundColor: "#101720",
};

const Page: React.FC<PageProps> = ({ children, title }) => {
  // # implementar loading state
  const { Header, Content, Footer } = Layout;
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-geist-mono)",
          colorText: "#c5d1ed",
          colorBgBase: "#2f343b",
          colorPrimary: "#54d3d4",
          colorHighlight: "#54d3d4",
          colorIcon: "#7b8eb5",
          colorInfo: "#54d3d4",
        },
        components: {
          Form: {
            colorInfoBorder: "#fff",
          },
        },
      }}
    >
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Creatorsfy.</Header>
        {title && <Divider style={{ borderColor: "#c5d1ed" }} />}
        <Typography style={titleStyle}>{title}</Typography>
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>@Creatorsfy</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;
