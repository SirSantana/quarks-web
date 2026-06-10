import "@/styles/globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

// ─── Font definitions ─────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: {
    template: "%s · OBD.guide",
    default: "OBD.guide — Referencia técnica de códigos OBD-II",
  },
  description:
    "La referencia técnica más completa para códigos OBD-II. Busca, entiende y diagnostica cualquier fallo con precisión.",
  keywords: ["OBD2", "OBD-II", "DTC", "códigos de falla", "diagnóstico automotriz", "check engine"],
  authors: [{ name: "OBD.guide" }],
  openGraph: {
    title: "OBD.guide — Referencia técnica de códigos OBD-II",
    description:
      "Más de 15.000 códigos DTC documentados. Diagnóstico, causas, reparaciones y costos estimados.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "OBD.guide",
    description: "Referencia técnica de códigos OBD-II",
  },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`
        ${inter.variable}
        ${spaceGrotesk.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body
        className="
          font-sans
          bg-[#F8F8F6]
          text-[#0F0F0F]
          antialiased
          min-h-screen
        "
      >
        {children}
      </body>
    </html>
  );
}