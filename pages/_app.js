import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';
import { AuthProvider } from '../Context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client={client}>
        <AuthProvider>
        <Component {...pageProps} />
        </AuthProvider>
  </ApolloProvider>
  )
}

export default MyApp
