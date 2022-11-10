

export default function Marcas({marca}){
    return(
        <img
                src={`/${marca}.png`}
                alt={`marca ${marca}`}
                style={{ width: "30px", height: "30px", margin:'2px' }}
              />
    )
}