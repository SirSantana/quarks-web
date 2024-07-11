import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


// const URI = process.env.NEXT_PUBLIC_API_PRODUCTION
const URI = 'http://localhost:4000/graphql';


// const URI = proccess.env.DEV


const httpLink = createHttpLink({
  uri: URI
})
const authLink = setContext(async (_, { headers }) => {
  let token;
  let negocioToken;

  // get the authentication token from local storage if it exists
  if (typeof window !== "undefined") {
    token = localStorage.getItem('token');
    negocioToken = localStorage.getItem('negocioToken');
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || negocioToken || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: (error) => {
    console.error('Apollo Client Error:', error);
  },
});