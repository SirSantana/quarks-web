// pages/_app.js
import { client } from '@/client'; // Asumo que esto es para ApolloClient
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
// *** Eliminar la importación de SessionProvider de NextAuth.js ***
// import { SessionProvider } from 'next-auth/react'; // <-- Elimina esta línea

import { Poppins, } from 'next/font/google'; // Asegúrate de que esto esté bien escrito si hay error
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/Context/AuthContext';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });


export default function App({ Component, pageProps }) { // 'session' en pageProps ya no es necesario si no usas NextAuth.js
  return (
    <>
      {/* <ApolloProvider client={client}> */}
        {/* *** Eliminar la envoltura con SessionProvider de NextAuth.js *** */}
        {/* <SessionProvider session={pageProps.session}> */} {/* <--- Elimina esta línea */}
        <AuthProvider>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
        {/* </SessionProvider> */} {/* <--- Elimina esta línea */}
        <Analytics /> {/* Mantener Analytics */}
      {/* </ApolloProvider> */}
    </>
  );
}