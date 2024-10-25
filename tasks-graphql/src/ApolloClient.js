import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // Reemplaza con la URL de tu API GraphQL
  cache: new InMemoryCache(),
});

export default client;
