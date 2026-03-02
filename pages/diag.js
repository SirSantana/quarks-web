"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ================== UTIL SLUG ================== */

function generateSlugFromText(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ================== COMPONENT ================== */

export default function DiagnosticChat() {
  const router = useRouter();

  const [step, setStep] = useState("brand");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [slug, setSlug] = useState(null);

  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || chatClosed) return;

    /* ================== STEP 1 - MARCA ================== */
    if (step === "brand") {
      setBrand(input.trim());
      setConversation([
        { role: "assistant", content: "¿Cuál es el modelo del vehículo?" },
      ]);
      setStep("model");
      setInput("");
      return;
    }

    /* ================== STEP 2 - MODELO ================== */
    if (step === "model") {
      setModel(input.trim());
      setConversation([
        { role: "assistant", content: "Describe el problema del vehículo." },
      ]);
      setStep("diagnosis");
      setInput("");
      return;
    }

    /* ================== STEP 3 - DIAGNÓSTICO FINAL ================== */

    let currentSlug = slug;

    if (!currentSlug) {
      currentSlug = generateSlugFromText(input);
      setSlug(currentSlug);
    }

    const updatedConversation = [
      ...conversation,
      { role: "user", content: input.trim() },
    ];

    setConversation(updatedConversation);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/diagnostico/diagnostic-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: currentSlug,
          brand,
          model,
          conversation: [
            {
              role: "system",
              content: `Vehículo: ${brand} ${model}`,
            },
            ...updatedConversation,
          ],
        }),
      });

      const data = await res.json();

      /* 🔥 Esperamos que el backend devuelva:
         {
           diagnostico: "...",
           precioMin: 150000,
           precioMax: 350000
         }
      */

      const finalMessage = `
🔎 Diagnóstico para ${brand} ${model}:

${data.diagnostico}

💰 Precio estimado:
Entre $${data.precioMin?.toLocaleString()} y $${data.precioMax?.toLocaleString()} COP.

Te estamos redirigiendo al reporte completo...
      `;

      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: finalMessage },
      ]);

      setChatClosed(true);

      // ⏳ Pequeño delay visual

    } catch (error) {
      console.error("Error:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ocurrió un error generando el diagnóstico.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Diagnóstico Mecánico Inteligente</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 20,
          minHeight: 300,
          marginBottom: 15,
          background: "#f9f9f9",
        }}
      >
        {step === "brand" && conversation.length === 0 && (
          <p>
            <strong>¿Cuál es la marca del vehículo?</strong>
          </p>
        )}

        {conversation.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: 10,
              textAlign: msg.role === "assistant" ? "left" : "right",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: 10,
                borderRadius: 8,
                background:
                  msg.role === "assistant" ? "#e4e6eb" : "#007bff",
                color: msg.role === "assistant" ? "#000" : "#fff",
                maxWidth: "80%",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && <p>Analizando información...</p>}
      </div>

      {!chatClosed && (
        <>
          <input
            type="text"
            placeholder="Escribe aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              marginTop: 10,
              padding: "10px 20px",
              borderRadius: 6,
              border: "none",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {loading ? "Procesando..." : "Enviar"}
          </button>
        </>
      )}

      {chatClosed && (
        <p style={{ marginTop: 20, color: "green" }}>
          ✅ Diagnóstico completado.
        </p>
      )}
    </div>
  );
}
