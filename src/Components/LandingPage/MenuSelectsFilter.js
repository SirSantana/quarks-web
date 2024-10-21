import Link from "next/link";
import SelectTipoCombustible from "../Gasolineras/SelectTipoCombustible";
import SelectServicio from "../MenuSelects/SelectServicio";
import styles from '@/styles/Explore.module.css';



export default function MenuSelectsFilter({ setIsLoading }) {
  return (
    <div className={styles.containerStickySelects}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Servicio</label>
          <SelectServicio setIsLoading={setIsLoading} />
        </div>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Servicio</label>
          <SelectTipoCombustible />
        </div> */}
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Ciudad</label>
            <SelectCiudad setIsLoading={setIsLoading} />
          </div> */}
      </div>
      {/* <button style={{
        cursor: 'pointer', border: '1px solid #6C788E', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#6C788E', backgroundColor: 'white', fontWeight: '500', marginTop: '16px', whiteSpace: 'nowrap', // Asegura que el texto no se rompa en varias líneas
        display: 'inline-block'
      }}>
        Ver Lista
      </button>
      <Link href="/explore/mecanicos/carro/frenos/bogota">
        ir
      </Link> */}
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Orden por</label>
        <SelectOrderBy />
      </div> */}
    </div>
  )
}