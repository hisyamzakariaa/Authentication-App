import { createContext, useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const MMKV = new MMKVLoader().initialize();

  useEffect(() => {
    const token = MMKV.getStringAsync("token");
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    MMKV.setStringAsync("token", token);
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
