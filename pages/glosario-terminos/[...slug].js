import { client } from "@/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { GET_ARTICULO, GET_TERMINO } from "@/graphql/queries";

import Layout from "@/src/Components/Layout";

import { useRouter } from "next/router";
import LayoutGlosario from "@/src/Components/Articulos/Layout";
import MarkdownContent from "@/src/Components/Articulos/MarkdownContent";

let mk = `# ALTERNADOR: TODO LO QUE NECESITAS SABER

---
![Cada cuanto cambiar el filtro de combustible?](https://res.cloudinary.com/db3veuotr/image/upload/v1739023985/filtro-combustible-glosario_m2s8wu.webp)

## ✨ INTRODUCCIÓN

El alternador es una de las piezas fundamentales del sistema eléctrico de un automóvil. Su función principal es transformar la energía mecánica en energía eléctrica para recargar la batería y alimentar los sistemas eléctricos del vehículo mientras está en marcha.

---

## ⚙️ PARTES DEL ALTERNADOR

El alternador está compuesto por varias partes clave:

- **ROTOR**: Parte giratoria que genera el campo magnético.
- **ESTÁTOR**: Bobinas fijas donde se induce la corriente eléctrica.
- **REGULADOR DE VOLTAJE**: Controla la cantidad de energía enviada a la batería.
- **DIODOS RECTIFICADORES**: Transforman la corriente alterna (CA) en corriente continua (CC).
- **POLEA**: Conectada al cigüeñal a través de una correa para recibir movimiento.
- **CARCASA**: Protege los componentes internos del alternador.

---

## ⚡ CÓMO FUNCIONA EL ALTERNADOR

El alternador funciona a través de los siguientes pasos:

1. **EL MOTOR EN MARCHA** hace girar la polea del alternador mediante una correa.
2. **EL ROTOR GENERA UN CAMPO MAGNÉTICO** dentro del estátor.
3. **EL ESTÁTOR CONVIERTE LA ENERGÍA MECÁNICA EN ELECTRICIDAD** mediante inducción electromagnética.
4. **LOS DIODOS RECTIFICADORES CONVIERTEN LA CORRIENTE ALTERNA EN CORRIENTE CONTINUA**.
5. **EL REGULADOR DE VOLTAJE AJUSTA LA SALIDA DE ENERGÍA** para evitar sobrecargas en la batería.
6. **LA BATERÍA SE RECARGA Y ALIMENTA LOS SISTEMAS ELÉCTRICOS DEL VEHÍCULO**.

---

## ⚠️ SÍNTOMAS DE UN ALTERNADOR DEFECTUOSO

Un alternador en mal estado puede provocar varios problemas en el auto. Algunos síntomas comunes son:

- **🔋 BATERÍA DESCARGADA**: Si el alternador no genera suficiente energía, la batería se agotará rápidamente.
- **🔆 LUCES TENUES O PARPADEANTES**: Indican que el sistema eléctrico no está recibiendo suficiente energía.
- **⚠️ INDICADOR DE BATERÍA ENCENDIDO EN EL TABLERO**: Señala una falla en la carga del sistema.
- **🛠️ RUIDO EN LA CORREA DEL ALTERNADOR**: Puede deberse a desgaste o desajuste.
- **🚗 EL AUTO SE APAGA MIENTRAS CONDUCES**: Signo de que la batería no está recibiendo carga suficiente.

---

## 🌟 CONSEJOS PARA MANTENER EL ALTERNADOR EN BUEN ESTADO

Para evitar problemas con el alternador, sigue estas recomendaciones:

- **REVISA PERIÓDICAMENTE LA CORREA DEL ALTERNADOR** para detectar desgaste o tensión inadecuada.
- **LIMPIA LAS CONEXIONES ELÉCTRICAS** para evitar falsos contactos.
- **EVITA EL USO EXCESIVO DE DISPOSITIVOS ELÉCTRICOS** cuando el motor esté apagado.
- **REVISA EL ESTADO DE LA BATERÍA REGULARMENTE**, ya que una batería defectuosa puede afectar al alternador.
- **SI NOTAS SÍNTOMAS EXTRAÑOS, CONSULTA A UN MECÁNICO** antes de que el problema se agrave.

---

## 🌟 CONCLUSIÓN

El alternador es un componente clave para el funcionamiento de cualquier vehículo moderno. Mantenerlo en buen estado no solo prolonga la vida útil del sistema eléctrico, sino que también evita fallas inesperadas en el camino. Si notas algún síntoma de mal funcionamiento, es mejor actuar rápidamente para evitar problemas mayores.

---`

export default function Repuesto({ data }) {
  const router = useRouter()

  let productoMarcado = {
    titulo: data.title,
    image: data.image,
    url: router.asPath,
    fecha: data?.createdAt
  }
  const breadcrumbItems = [
    { label: "Glosario", href: "/glosario-terminos" },
  ];

  return (
    <Layout index={false}
      title={data?.title}
      productoMarcado={productoMarcado}
      description={data?.description}
      keywords={data?.tags}
      type='article'
      fecha={data?.createdAt} image={data?.image} tags={data?.tags}
      url={router?.asPath}>

      {/* <div className={styles2.containerBig}>
        <Sidebar/>
        <main className={styles2.containerMain}>
          <div className={styles2.container}>
            <Breadcrumb items={breadcrumbItems} />
          <Markdown >{data?.parrafoUnoDos}</Markdown>
          </div>
          <ArticulosRelacionados />
          <BottomArticulo palabras={data?.palabrasClave} />
        </main>
      </div> */}
      <LayoutGlosario >
        {/* <h2>{router.query.id}</h2> */}
        <MarkdownContent data={data} />
      </LayoutGlosario>

    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.slug;

  const { data, error } = await client.query(
    {
      query: GET_TERMINO,
      variables: { slug: parts[0] },
    }
  )

  return {
    props: {
      data: data?.getTermino,
    },
  };
}

