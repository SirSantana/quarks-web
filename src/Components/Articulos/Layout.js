import styles2 from '@/styles/MarkDown.module.css'
import Sidebar from "@/src/Components/Articulos/SideBar";
import Breadcrumb from "@/src/Components/Breadcumb/Breadcumb";
import ArticulosRelacionados from "@/src/Components/Articulos/ArticulosRelacionados";
export default function LayoutGlosario({ children }) {
  const breadcrumbItems = [
    { label: "Glosario", href: "/glosario-terminos" },
  ];
  return (
    <div className={styles2.containerBig}>
      {/* <AsideGlosario /> */}
      <Sidebar />

      <main className={styles2.containerMain}>
        <div className={styles2.container}>
          <Breadcrumb items={breadcrumbItems} />
          {/* <p style={{fontSize:'14px', fontWeight:'500', color:'#A6AEC1'}}>Glosario - {router.query.id.split('-')[0]}</p> */}
         {children}
        </div>
        <ArticulosRelacionados />
        {/* <BottomArticulo palabras={data?.palabrasClave} /> */}
      </main>
    </div>
  )
}