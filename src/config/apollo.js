import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

const httpLink = createUploadLink({
  //uri: 'http://192.168.100.9:4000/',
  //uri: 'https://mechanicos-server-drp.herokuapp.com/',
  // uri: 'https://mechanicos-server.herokuapp.com/',
  uri: 'https://us-central1-frb-gql-mechanicos.cloudfunctions.net/graphql',
//   uri: 'http://eqfam:4000/',
  // uri: 'https://mechanicosweb.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
