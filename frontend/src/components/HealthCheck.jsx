import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/client";

export default function HealthCheck() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("checking");
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/health/")
      .then((res) => {
        setData(res.data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  const colors = {
    checking: "bg-yellow-50 border-yellow-300 text-yellow-800",
    ok: "bg-green-50 border-green-300 text-green-800",
    error: "bg-red-50 border-red-300 text-red-800",
  };

  return (
    <div className={`border rounded-lg p-4 text-sm font-mono ${colors[status]}`}>
      <div className="font-semibold mb-1">
        {status === "checking" && t("health.checking")}
        {status === "ok" && `✓ ${t("health.ok")}`}
        {status === "error" && `✗ ${t("health.error")}`}
      </div>
      {data && (
        <pre className="text-xs mt-2 opacity-75">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
