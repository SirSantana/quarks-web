import { client } from '@/client'
import { AuthProvider } from '@/Context/AuthContext'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps, session }) {



  return <ApolloProvider client={client}>
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  </ApolloProvider>
}
