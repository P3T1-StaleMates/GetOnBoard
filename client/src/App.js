import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Navbar from './components/Global/Navbar'
import Home from './pages/Home';
// import Footer from './components/Global/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        {/* Render conditionally? home if logged out, dashboard if logged in */}
          <Home />
        {/* <Footer /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
