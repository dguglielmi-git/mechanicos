import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Auth from './views/Auth';
import AuthContext from './context/AuthContext';
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { getToken, decodeToken, removeToken } from './utils/token';
import Navigation from './routes/Navigation';

function App() {
  const [auth, setAuth] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      const { exp } = decodeToken(token);
      if (Date.now() >= (exp * 1000)) {
        cleanStorage();
      } else {
        try {
          setAuth(decodeToken(token));
        } catch (error) {
          cleanStorage();
        }
      }
    }
  }, []);

  const cleanStorage = () => {
    client.clearStore();
    logout();
    history.push('/');
  }


  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
