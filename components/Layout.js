import Head from 'next/head'
import Navbar from './Navbar/Navbar'

export default function Layout({children, title, description, type, price}){
    console.log(price);
    return(
        <>
        <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="title" />
        <meta property='og:description' content={description} />
        <meta property='og:type' content={type} />
        <meta property='og:site_name' content='https://quarks.com.co' />
        {price &&
        <>
        <meta property="product:price:amount" content={price}/>
        <meta property="product:price:currency" content="COP"/>
        </>}
        
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href="/Logo.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css"></link>
        
        </Head>
        
        <main ><Navbar/>{children}</main>
      
        </>
    )
}