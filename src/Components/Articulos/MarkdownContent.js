import Markdown from "react-markdown";
import { client } from "@/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { GET_ARTICULO } from "@/graphql/queries";


export default function MarkdownContent({data}) {
    
  return (
        <Markdown >{data?.content}</Markdown>
  );
}

