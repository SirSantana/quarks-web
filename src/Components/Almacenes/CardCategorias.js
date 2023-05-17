import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import styles from '@/styles/Almacenes.module.css'


export default function CardCategorias({setFormBusqueda, formBusqueda}) {
  
  return (
    <Swiper
      style={{ width: '100%', paddingBottom: '16px', paddingLeft: '4px' }}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      grabCursor={true}
      pagination={{ clickable: true, }}
      breakpoints={{
        0: {
          slidesPerView: 1.6,
          spaceBetween: 16,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        980: {
          slidesPerView: 3,
          spaceBetween: 16
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 32
        },
        
      }}
    >
      <SwiperSlide>
        <div  className={styles.cardCategoriasAlmacenes}>
          <img src={'../storefront-outline.svg'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 100</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes registrados</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Accesorios'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Accesorios.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 10</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Accesorios</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Clutch'})}  className={styles.cardCategoriasAlmacenes}>
          <img src={'../Clutch.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 6</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Clutch</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Carroceria'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Carroceria.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 15</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Carroceria</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Baterias'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Baterias.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 4</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Baterias</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Motor'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Motor.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 12</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Motor</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Caja y Transmision'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Caja y Transmision.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 7</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Caja</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Correas'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Correas.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 8</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Correas</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Direccion y suspension'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Direccion y suspension.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 6</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Suspension</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Electricos'})}className={styles.cardCategoriasAlmacenes}>
          <img src={'../Electricos.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 4</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Electricos</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Filtros'})}className={styles.cardCategoriasAlmacenes}>
          <img src={'../Filtros.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 9</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Filtros</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Frenado'})}className={styles.cardCategoriasAlmacenes}>
          <img src={'../Frenado.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 14</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Frenado</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Lubricantes'})}className={styles.cardCategoriasAlmacenes}>
          <img src={'../Lubricantes.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 7</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Almacenes de Lubricantes</h6>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div onClick={()=> setFormBusqueda({...formBusqueda, categoria:'Refrigeracion'})} className={styles.cardCategoriasAlmacenes}>
          <img src={'../Refrigeracion.png'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
          <div>
          <h3 style={{ lineHeight: '24px' }} className={styles.title}>+ 9</h3>
          <h6 style={{fontSize:'14px'}} className={styles.subtitle}>Refrigeracion</h6>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}