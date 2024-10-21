import { useRouter } from "next/router"


export default function Categoria(){
    const router = useRouter()
    const { categoria, vehiculo, servicio, ciudad } = router.query;
    
    return(
       <div>
        <h1>{categoria}, {vehiculo}, {servicio}, {ciudad}</h1>
       </div> 
    )
}