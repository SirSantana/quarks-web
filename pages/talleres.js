import Layout from "../components/Layout";
import { Theme } from "../styles/Theme";
import styles from '../styles/Talleres.module.css'
import { useEffect, useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { client } from "../client";
import TalleresRender from "../components/Talleres/Talleres";



export default function Talleres({data, loading}){
   
    return(
        <Layout title={'Talleres'}>
            <div className={styles.container}>
            <h2 style={{fontSize:'52px', width:'300px', color:'#1b333d', lineHeight:'50px'}}>Encuentra tu taller!</h2>

            <div className={styles.box}>
                <div className={styles.container1}>
                <span className={styles.icon}><i className="fa fa-search"></i></span>
                <input className={styles.input} type="search" id="search" placeholder="Que servicio estas buscando?" />
                </div>
            </div>
            </div>
            <div className={styles.grid}>
                {loading && 
            <h2 style={{fontSize:'52px', width:'300px', color:'#1b333d', lineHeight:'50px'}}>Cargando tu taller!</h2>
                
                }
            <TalleresRender data={data} loading={loading}/>
                </div>

        </Layout>
    )
}
export async function getServerSideProps() {
    const { data, loading, error } = await client.query({
      query: gql`
        query getNegocios{
            getNegocios{
                nombre
                marcas
                tipo
                ciudad
                pais
                id
                direccion
                celular
                repuestos
              
            }
          }
      `,
    });
    return {
      props: {
        data: data.getNegocios,
        loading
      },
    };
  }