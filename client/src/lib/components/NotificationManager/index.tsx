import { ToastBar, Toaster, toast } from "react-hot-toast";
import { Alert } from "antd";

const NotificationsManager = () => {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t} style={{ padding: 0, minWidth: "100%" }}>
          {() => (
            <div style={{ minWidth: "100%" }}>
              <Alert
                type={t.icon as "success" | "info" | "warning" | "error"}
                onClose={() => toast.dismiss(t.id)}
                message={t.message?.toString()}
              />
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default NotificationsManager;
