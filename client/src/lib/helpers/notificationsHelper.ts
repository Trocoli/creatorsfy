import toast from "react-hot-toast";

export type NotificationProps = {
  state: "success" | "info" | "warning" | "error";
  message: string;
  duration?: number;
};

export const pushNotification = ({
  state,
  message,
  duration = 5_000,
}: NotificationProps) => {
  toast(message, { icon: state, duration });
};

export const pushApiNotification = ({ state, message }: NotificationProps) => {
  toast(message, { icon: state, duration: 5_000 });
};

export const clearNotifications = () => {
  toast.dismiss();
};
