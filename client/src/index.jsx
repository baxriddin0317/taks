import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientProvider from './ApolloProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientProvider />
  </React.StrictMode>
);
