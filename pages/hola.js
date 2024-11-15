import Link from "next/link";


export default function Hola() {
  return (
    <div>
      <h1>Hola</h1>
      <div style={{height:'100vh', backgroundColor:'#f1f1f1'}}></div>
      <Link  href={'/corsa-motors'}>Link</Link>
    </div>
  )
}