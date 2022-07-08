

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Global/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Global/Footer";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyFriends from "./pages/MyFriends"
import MyGames from "./pages/MyGames"
import GroupDashboard from "./pages/GroupDashboard"
// import Login from "./pages/Login";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main className="bg-white mt-5 mb-5 mrl-20">
          <div className="container">
            <div className="row">
              <Navbar />

              <div className="col-8">
                <div className="bg-cream">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/myfriends" element={<MyFriends />} />
                    <Route path="/mygames" element={<MyGames />} />
                    <Route path="/groupdashboard" element={<GroupDashboard />} />
                
                  </Routes>
                </div>
              </div>

              <div className="col-2">
                <Footer/>
              </div>
            </div>
          </div>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
