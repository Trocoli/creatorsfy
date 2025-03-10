import { ConfigProvider, Divider, Layout } from "antd";
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
  width: "100%",
};

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
  height: "calc(100vh - 20px)",
  width: "100%",
};

const Page: React.FC<PageProps> = ({ children, title }) => {
  // # implementar loading state
  const { Header, Content, Footer } = Layout;
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-geist-mono)",
        },
      }}
    >
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>{title}</Header>
        {title && (
          <Divider style={{ borderWidth: 2, borderColor: "var(--white)" }} />
        )}
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;
