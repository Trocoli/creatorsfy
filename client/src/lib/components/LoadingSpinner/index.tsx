import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = () => {
  return (
    <div className="h-full w-full flex align-middle justify-center">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default LoadingSpinner;
