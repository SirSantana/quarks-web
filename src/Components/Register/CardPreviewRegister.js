import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { categorias } from "@/src/data/Categorias";
import { useMutation, useQuery } from "@apollo/client";
import Button, { ButtonVariant } from "../Button/Button";
import Link from "next/link";
import styles from '@/styles/Registro.module.css'
import renderStars from "@/utils/renderStars";
import AddFotoPerfil from "./AddFotoPerfil";
import { useState } from "react";


export default function CardPreviewRegister({ taller,  setFormData}) {
  const [prevImage, setPrevImage] = useState(taller?.fotoperfil)

  return (
    <div  className={styles.containerCardTaller} >
        <AddFotoPerfil dataImportante={taller} setDataImportante={setFormData} fotoActual={prevImage} setPrevImage={setPrevImage} fotoRegister={true} error={false} />
      <section className={styles.sectionDataCardTaller}>
        <div style={{width: '100%'}}>
          <h3 style={{ fontSize: '20px', lineHeight: '22px', color: '#182537', fontWeight: '600' }}>{taller?.nombre}</h3>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>Taller especializado BMW</p> */}
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>{taller?.tipo === 'Almacen' ? "Almacén de Autopartes" : taller?.tipo === 'Mecánico a domicilio' ? "Mecánico" : "Taller Mecánico"}</p>
            <span style={{ marginTop: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#182537', fontSize: '14px', fontWeight: '500' }}>{renderStars(Number(4.8))}{4.8} ({taller.numerocalificacionesmaps ? taller.numerocalificacionesmaps : 1} reseñas)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop:'8px'}}>

          <ul style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {taller?.categorias?.slice(0, 3).map(el => {
              
              const category = categorias?.find(cat => cat.nombre.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                category &&
                <li key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', }}>
                  {/* {category?.img && <img src={`/${category?.img}`} style={{height:'20px',width:'20px'}} alt={`Taller de autos de ${el}`} />} */}
                  <img
                    src={`/${category?.img}`} // Ruta de la imagen
                    alt={`Servicio de ${el}`}
                    style={{ height: '20px', width: '20px' }}
                  />
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '12px', color: '#464646' }}>{category?.nombre}</p>
                </li>
              )
            })}
            <li style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', color: '#929292', fontWeight: '500' }}>
              +{taller?.categorias?.length} servicios
            </li>
          </ul>

        </div>
        <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '8px', width: '100%', alignItems: 'flex-end' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#A6AEC1' }}>📍 {taller.direccion} {taller?.ciudad}</p>
          <Button variant={ButtonVariant.primary} size='sm' style={{ backgroundColor: '#E1EAFF', color: '#407BFF', fontSize: '12px', alignSelf: 'flex-end', margin: 0, borderRadius: '4px' }}>
            Ver taller
          </Button>
        </footer>
      </section>
    </div>
  )
}