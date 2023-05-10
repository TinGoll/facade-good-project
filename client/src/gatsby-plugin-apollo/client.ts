import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../settings/api.settings";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${GATSBY_API_HOST}:${GATSBY_API_PORT}/graphql`,
    fetch,
  }),
});

export default client;

// uri: `${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/graphql`,
