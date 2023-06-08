import LayoutDashboard from "../../src/Components/Dashboard/layoutDashboard";
import styles from '@/styles/Dashboard.module.css'
import CardAnalytics from "@/src/Components/Dashboard/CardAnalytics";


export default function Analiticas() {
  return (
    <LayoutDashboard title={'Analiticas | Quarks'}>
      <section className={styles.container}>
        <CardAnalytics />
      </section>
    </LayoutDashboard>
  )
}