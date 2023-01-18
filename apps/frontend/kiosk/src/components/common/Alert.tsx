import { useCallback, useMemo } from "react";
import { AlertColorTypes, AlertParams } from "../../@types";

const Alert: React.FC<AlertParams> = ({ type, text }) => {
  const render = useMemo((): JSX.Element => {
    let jsx = <></>;
    switch (type) {
      case "success": {
        jsx = (
          <div
            className={`p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 text-green-700 bg-green-100 dark:text-green-400`}
            role="alert"
          >
            <span className="font-medium">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>{" "}
            {text}
          </div>
        );
        break;
      }
      case "danger": {
        jsx = (
          <div
            className={`p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 text-red-700 bg-red-100 dark:text-red-400`}
            role="alert"
          >
            <span className="font-medium">Error</span> {text}
          </div>
        );
        break;
      }
    }
    return jsx;
  }, [type, text]);

  return render;
};

export default Alert;
