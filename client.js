import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


const URI = process.env.NEXT_PUBLIC_API_PRODUCTION
// const URI = 'http://localhost:4000/'

// const URI = proccess.env.DEV


const httpLink = createHttpLink({
    uri:URI  
})
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token || '',
    }
  }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache:new InMemoryCache()
})