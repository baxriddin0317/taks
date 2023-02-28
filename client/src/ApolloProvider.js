import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';
import {setContext} from "apollo-link-context"

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
})

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// create client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ClientProvider = () => {
  return (
    (
      <ApolloProvider client={client}>       
        <App />
      </ApolloProvider>
    )
  )
}

export default ClientProvider