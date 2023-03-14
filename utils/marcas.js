

export default function Marcas({marca}){
    return(
        <img
                src={`/${marca}.png`}
                alt={`marca ${marca}`}
                style={{ width: "40px", height: "40px", margin:'2px' }}
              />
    )
}