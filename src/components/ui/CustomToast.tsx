import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function CustomToast({
  type,
  message,
}: {
  type: "success" | "error" | "warning";
  message: string;
}) {
  const iconMap = {
    success: <CheckCircle className="text-teal-400" size={18} />,
    error: <XCircle className="text-red-400" size={28} />,
    warning: <AlertTriangle className="text-yellow-400" size={18} />,
  };

  return (
    <div className="flex gap-3 items-center">
      {iconMap[type]}
      <p className="text-sm font-medium text-white">{message}</p>
    </div>
  );
}
