import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


const URI = 'http://quarks-api.vercel.app/'
// const URI = proccess.env.DEV


const httpLink = createHttpLink({
    uri:URI  
})
const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: '',
      }
    }
  })

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache:new InMemoryCache()
})