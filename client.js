import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const URI = process.env.NEXT_PUBLIC_API_PRODUCTION
// const URI = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
  uri: URI,
  headers: {
    authorization: typeof window !== "undefined" ? localStorage.getItem('token') || localStorage.getItem('negocioToken') || '' : '',
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  onError: (error) => {
    console.error('Apollo Client Error:', error);
  },
});
