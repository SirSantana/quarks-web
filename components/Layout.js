import Head from 'next/head'
import Navbar from './Navbar/Navbar'

export default function Layout({children, title, description}){
    return(
        <>
        <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
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