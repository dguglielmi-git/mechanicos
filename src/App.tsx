import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import Auth from "./views/Auth";
import LandingPage from "./views/LandingPage";
import AuthContext from "./context/AuthContext";
import MyContextProvider from "./context/BudgetContext";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { decodeToken, getToken, removeToken } from "./utils/token";
import Navigation from "./routes/Navigation";

export default function App() {
  const [auth, setAuth] = useState<any>(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
      return;
    }

    const decoded: any = decodeToken(token);
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      cleanStorage();
      return;
    }

    try {
      setAuth(decoded);
    } catch (error) {
      cleanStorage();
    }
  }, []);

  const cleanStorage = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user: any) => {
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

  if (!auth) {
    if (window.location.pathname === "/login") {
      return (
        <ApolloProvider client={client}>
          <AuthContext.Provider value={authData as any}>
            <MyContextProvider>
              <Auth />
            </MyContextProvider>
          </AuthContext.Provider>
        </ApolloProvider>
      );
    }

    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider value={authData as any}>
          <MyContextProvider>
            <LandingPage />
          </MyContextProvider>
        </AuthContext.Provider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData as any}>
        <MyContextProvider>
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
        </MyContextProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

