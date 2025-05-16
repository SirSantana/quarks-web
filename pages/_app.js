import { client } from '@/client';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { Poppins,  } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/Context/AuthContext';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });


export default function App({ Component, pageProps, session }) {
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
        <SessionProvider session={session}>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
          <Analytics />
        </SessionProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}