import { useState } from "react";
import Button from "../../Button/Button";
import SelectBrand from "../../MenuSelects/SelectBrand";
import SelectServicio from "../../MenuSelects/SelectServicio";
import SelectServicioProfile from "../../MenuSelects/SelectServicioProfile";
import styles from '@/styles/Negocio.module.css'
import ModalSolicitarServicio from "./ModalSolicitarServicio";
import { useRouter } from "next/router";
let initialForm = {
  servicios: ['Electricos'],
  celular: '',
  marca: 'Chevrolet',
  referencia: '',
  descripcion: '',
  almacen: '',
  indicativo: ''
}

export default function CardSolicitarServicio({  openModal }) {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)

  return (
    <>
      <div className={styles.cardSolicitarServicio}>
        <h2 style={{ fontSize: '18px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '16px' }}>Agendar Cita</h2>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>¿Qué servicio necesita tu vehículo?</label>
          <SelectServicioProfile handleChange={(e) => setForm({ ...form, servicios: [e.label] })} width={'100%'} defaultInitial={form.servicios[0] ? form.servicios[0] : 'Cambio de Aceite'} form={form} />
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>¿Qué marca y modelo es tu vehículo?</label>
          <SelectBrand width={'80px'} handleChange={(e) => setForm({ ...form, marca: e.value })} handleChangeModelo={(e) => setForm({ ...form, referencia: e.target.value })} form={form} />
        </div>
        <Button onClick={openModal} fullWidth className={'desktopButton'} style={{ alignSelf: 'flex-end', margin: '24px 0 0 0', backgroundColor: '#407BFF', whiteSpace: 'noWrap' }} >Solicitar Revision</Button>
      </div>
      {router?.query?.modalSolicitar && <ModalSolicitarServicio  form={form} setForm={setForm} />}

    </>
  )
}