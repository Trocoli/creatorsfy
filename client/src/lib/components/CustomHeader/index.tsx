import { Button, Flex, Layout, Space, Typography } from "antd";

export interface CustomHeaderProps {
  action?: { label: string; action: () => void };
  loggedUser?: string;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const { action, loggedUser } = props;

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    width: "100%",
  };

  const { Header } = Layout;
  return (
    <Header style={headerStyle}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Creatorsfy.</div>
      <Space direction="vertical" size={0.5} style={{ display: "flex" }}>
        {loggedUser && action && (
          <>
            <Flex vertical={false}>
              <Typography>Logado como: </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {loggedUser}
              </Typography>
            </Flex>
            <Typography style={{ display: "flex", justifyContent: "end" }}>
              <Button type="link" size="small" onClick={action.action}>
                {action.label}
              </Button>
            </Typography>
          </>
        )}
      </Space>
    </Header>
  );
};

export default CustomHeader;
