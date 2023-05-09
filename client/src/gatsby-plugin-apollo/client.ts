import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `https://facade-good.ru:3000/graphql`,
    fetch,
  }),
});

export default client;

// uri: `${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/graphql`,

