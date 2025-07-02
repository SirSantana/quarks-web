// components/ConsultasCount.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ConsultasCount = ({ userId }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchConsultas = async () => {
      if (!userId) return;

      const { count, error } = await supabase
        .from("diagnostico_usos")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (error) {
        console.error("Error al contar consultas:", error);
        setCount(null);
      } else {
        setCount(count ?? 0);
      }
    };

    fetchConsultas();
  }, [userId]);

  if (count === null) return null;

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: "#e2e8f0",
        color: "#1e293b",
        fontSize: "0.75rem",
        padding: "2px 6px",
        borderRadius: "999px",
        marginTop: "4px",
      }}
    >
      {count}/3 consultas
    </div>
  );
};

export default ConsultasCount;
