import { client } from '@/client'
import { AuthProvider } from '@/Context/AuthContext'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'


export default function App({ Component, pageProps }) {



  return <ApolloProvider client={client}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
}
