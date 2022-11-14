import Head from 'next/head'
import Navbar from './Navbar/Navbar'

export default function Layout({children, title, description}){
    return(
        <>
        <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={'repuestos de carros y talleres en colombia'} />
        <meta property="og:title" content="Encuentra los repuestos de tu vehiculo en colombia" key="title" />
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href="/Logo.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css"></link>
        
        </Head>
        
        <main ><Navbar/>{children}</main>
      <footer >
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          quarks | Colombia
          <span >
            <img src="/Logo.png" alt="colMotors Logo" style={{width:"60px" ,height:"60px"}} />
          </span>
        </a>
      </footer>
        </>
    )
}