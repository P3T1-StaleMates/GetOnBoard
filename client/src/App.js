import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyFriends from "./pages/MyFriends"
import MyGames from "./pages/MyGames"
import MyEvents from "./pages/MyEvents"

import About from "./pages/About"
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
// import MyGroups from "./pages/MyGroups"
// import GroupDashboard from "./pages/GroupDashboard"
// import Login from "./pages/Login";

import Auth from "./utils/auth"

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
                    <Route path="/" element={
                      Auth.loggedIn() ?
                      (<Navigate to="/Dashboard" />) :
                      (<Landing />)
                    } />
                    <Route path="/Dashboard" element={
                      !Auth.loggedIn() ?
                      (<Navigate to="/" />) :
                      (<Dashboard />)
                    } />

                    {/* Do we even need this? */}
                    <Route path="/Login" element={
                      Auth.loggedIn() ?
                      (<Navigate to="/Dashboard" />) :
                      (<Login />)
                    } />


                    <Route path="/Signup" element={
                      Auth.loggedIn() ?
                      (<Navigate to="/Dashboard" />) :
                      (<Signup />)
                    } />
                    <Route path="/MyFriends" element={
                      !Auth.loggedIn() ?
                      (<Navigate to="/" />) :
                      (<MyFriends />)
                    } />
                    {/* <Route path="/myfriends" element={<MyGroups />} /> */}
                    <Route path="/MyGames" element={
                      !Auth.loggedIn() ?
                      (<Navigate to="/" />) :
                      (<MyGames />)
                    } />
                    <Route path="/MyEvents" element={
                      !Auth.loggedIn() ?
                      (<Navigate to="/" />) :
                      (<MyEvents />)
                    } />
                    <Route path="/About" element={<About />} />
                  </Routes>
                </div>
              </div>

              <div className="col-2">
                <Footer />
              </div>
            </div>
          </div>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
