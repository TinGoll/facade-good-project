import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/graphql`,
    fetch,
  }),
});

export default client;
