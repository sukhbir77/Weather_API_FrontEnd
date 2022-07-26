import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

//Initializing the State of the User.
const initialState = {
  user: null,
};

//Checking If the Token Exists in the LocalStorage
if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

//Creating an AuthContext
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

//Defining Reducer For Login And Logout
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

//Dispatching Actions based on User's Choice
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }}  {...props} />;
}


export {AuthContext, AuthProvider};