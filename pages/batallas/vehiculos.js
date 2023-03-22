import { CREATE_VOTE } from "@/graphql/mutations";
import { GET_BATALLAS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import styles from "@/styles/Batallas.module.css";
import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function BatallasVehiculos() {

  const { loading, error, data } = useQuery(GET_BATALLAS)
  const router = useRouter()
  const [createVote, result] = useMutation(CREATE_VOTE)
  const [isVoted, setIsVoted] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [modal, setVisibleModal] = useState(false)
  let carroUnoVotos;
  let carroDosVotos;

  const sendVote = (id) => {
    if (isVoted) {
      return
    }
    localStorage.setItem(data?.getBatallas[0].id, JSON.stringify(id))
    createVote({ variables: { id: data?.getBatallas[0].id, idCarro: id } })
    setIsVoted(localStorage?.getItem(data?.getBatallas[0].id))
    setVisibleModal(true)
  }
  useEffect(() => {
    setIsVoted(localStorage?.getItem(data?.getBatallas[0].id))
    carroUnoVotos = data?.getBatallas[0].carroUnoVotos
    carroDosVotos = data?.getBatallas[0].carroDosVotos
    setPercentage((carroUnoVotos * (100)) / (carroUnoVotos + carroDosVotos))
  }, [data]);
  console.log(percentage);
  return (
    <Layout title={'Aveo vs Optra'} description={'Batallas de vehiculos'}>

      <div className={styles.big}>

        <div className={styles.container}>
          <h1 className={styles.title}>Cuál prefieres?</h1>
          {/* <h3 className={styles.subtitle}>Cual prefieres?</h3> */}


          <div className={styles.containerCars}>
            {data?.getBatallas.map(el => (
              <>
                <div onClick={() => sendVote(el.carroUnoId)} className={styles.containerCar}>
                  <img style={{ opacity: isVoted && '0.3' }} src='/carro1.jpg' className={styles.image} />
                  <div style={{ opacity: isVoted && '0.8' }} className={styles.overlay1}>
                    <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className={styles.containerText}>
                      <p style={{ fontSize: isVoted && '16px' }} className={styles.name}>{el.carroUno} </p>
                      {isVoted &&
                        <>
                          <p className={styles.percentage}>{Math.round(percentage)}% </p>
                          <p className={styles.votos}>{el.carroUnoVotos} votos</p>
                        </>
                      }
                    </div>
                  </div>
                </div>
                <div className={styles.circle}>
                  <h2 style={{ color: '#76022C' }}>vs</h2>
                </div>
                <div onClick={() => sendVote(el.carroDosId)} className={styles.containerCar}>
                  <img style={{ opacity: isVoted && '0.3' }} src='/carro2.jpg' className={styles.image} />
                  <div style={{ opacity: isVoted && '0.8' }} className={styles.overlay2}>
                    <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className={styles.containerText}>
                      <p style={{ fontSize: isVoted && '16px' }} className={styles.name}>{el.carroDos} </p>
                      {isVoted &&
                        <>
                          <p className={styles.percentage}>{100 - Math.round(percentage)}% </p>
                          <p className={styles.votos}>{el.carroDosVotos} votos </p>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </>
            ))
            }
          </div>
          {/* <button className={styles.button}>Siguiente</button> */}
        </div>
        {modal &&
          <div onClick={() => setVisibleModal(false)} className={styles.modal}>
            <div className={styles.modalContent}>
              <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }} href="https://play.google.com/store/apps/details?id=com.quarks.vehiculo">
                <img src="/imageApp.jpg" className={styles.imageApp} />
              </a>
            </div>
          </div>
        }
      </div>
    </Layout>
  )
}