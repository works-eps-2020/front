import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { ApolloClient } from "apollo-client";
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';

const WS_URL = 'wss://hasura.k8s.d0do.fr/v1/graphql';
const API_URL = 'https://hasura.k8s.d0do.fr/v1/graphql';

export const webSocket = (token: string) => {
  const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers: {
          'Authorization': `Bearer ${token}`
         }
       }
    }
  });
  
  const httpLink = new HttpLink({
    uri: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const link = split(
    ({ query }) => {
      return true;
    },
    wsLink,
    httpLink,
  )
  
  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
  return apolloClient
}

export const wsSubscribe = (token: string, query: string, callback: Function, variable: any = {}) => {
  return webSocket(token).subscribe({
    query: gql(query),
    variables: variable
  }).subscribe({
    next (data) {
      return callback(data)
    }
  });
}