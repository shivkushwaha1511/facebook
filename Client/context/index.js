import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const router = useRouter();

  //axios default config
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //axios config for validating token expiry
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const res = error.response;
      if (res.status === 401 && res.config && !res.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );

  //updating state if data available in local storage
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
