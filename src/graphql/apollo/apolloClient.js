import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { API_ORIGIN, SOCKET_ORIGIN } from '../../constants/url';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: `${API_ORIGIN}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jamukh_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: SOCKET_ORIGIN,
  reconnect: true,
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink;

const client = new ApolloClient({
  uri: API_ORIGIN + '/graphql',
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
