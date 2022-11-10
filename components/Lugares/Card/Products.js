import Image from "next/image";



export default function ProductsCard({el}){
    

    return(
        <>
        
          <img  src={`data:image/jpeg;base64,${el.imagen}`}  alt='Imagen repuesto' style={{width:'100%', height:'60%'}}/>
          <div style={{padding:'10px', margin:0}}>
          <h4
            style={{
              fontSize: "14px",
              width:'100%',
              fontWeight: 600,
              margin: 0,
              marginBottom:'10px',
              color: "gray",
              lineHeight:'20px'
            }}
          >
            {el.titulo}
          </h4>
          <h4 style={{
              fontSize: "24px",
              width:'100%',
              fontWeight: 600,
              margin: 0,
              color: "#1b333d",
            }}>
            $ {el.precio} 
          </h4>
          <h6 style={{
              fontSize: "14px",
              width:'100%',
              fontWeight: 400,
              margin: 0,
              color: "gray",
            }}>
           Ver detalle
          </h6>
          </div>
          
        </>
          
    )
}