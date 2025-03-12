import Markdown from "react-markdown";
import { useEffect } from "react";


export default function MarkdownContent({data}) {
  useEffect(() => {
    // Verifica si AdSense está disponible y recarga los anuncios
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (error) {
        console.error("Error al cargar AdSense:", error);
      }
    }
  }, [data]);
  return (
        <Markdown >{data?.content}</Markdown>
  );
}

