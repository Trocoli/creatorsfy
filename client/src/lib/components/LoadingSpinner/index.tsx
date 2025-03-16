import React from "react";
import Page from "../Page";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = () => {
  return (
    <Page>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Page>
  );
};

export default LoadingSpinner;
