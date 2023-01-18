import { useMemo } from "react";
import { AlertColorTypes, AlertParams } from "../../@types";

const Alert: React.FC<AlertParams> = ({ type, text }) => {
  const preText = useMemo(() => {
    switch (type) {
      case "danger": {
        return "Error";
      }
      case "warning":
      case "success":
      case "info": {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }
  }, [type]);

  const colors = useMemo(() => {
    let color: AlertColorTypes = "green";
    switch (type) {
      case "danger": {
        color = "red";
        break;
      }
      case "warning": {
        color = "yellow";
        break;
      }
      case "success": {
        color = "green";
        break;
      }
      case "info": {
        color = "blue";
        break;
      }
    }
    return `text-${color}-700 bg-${color}-100 dark:text-${color}-400`;
  }, [type]);

  const jsx = useMemo(() => {
    return (
      <div
        className={`p-4 mb-4 text-sm ${colors} rounded-lg dark:bg-gray-800 `}
        role="alert"
      >
        <span className="font-medium">{preText}</span> {text}
      </div>
    );
  }, [colors, preText, text]);

  return jsx;
};

export default Alert;
