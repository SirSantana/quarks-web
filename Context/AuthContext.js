import React, { useState, createContext, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { client } from '../client';
import { GET_NEGOCIOVDOS_ONE, GET_USER } from '../graphql/queries';


export const AuthContext = createContext({
  user: null,
  login: () => { },
  logout: () => { },
  loading: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { data } = useQuery(GET_NEGOCIOVDOS_ONE);
  const [token, setToken] = useState(null)
  const login = () => {
    if (data?.getNegocioVDosOne) {
      setUser(data?.getNegocioVDosOne);
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (data?.getNegocioVDosOne) {
      setUser(data?.getNegocioVDosOne);
    }
  }, [data]);


  const valueContext = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>;
}



// import { createContext, useReducer, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

// const initialState = {
//   user: null
// }

// const isBrowser = typeof window !== 'undefined';

// if (isBrowser && localStorage.getItem("negocioToken")) {
//   const decodedToken = jwtDecode(localStorage.getItem("negocioToken"))
//   initialState.user = decodedToken
// }

// const AuthContext = createContext({
//   user: null,
//   login: (userData) => { },
//   logout: () => { }
// });

// function authReducer(state, action) {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         user: action.payload
//       }
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null
//       }
//     default:
//       return state;
//   }
// }

// function AuthProvider(props) {
//   const [state, dispatch] = useReducer(authReducer, initialState)

//   const login = (userData, token) => {
//     if (isBrowser) {
//       localStorage.setItem('negocioToken', token)
//     }
//     dispatch({
//       type: 'LOGIN',
//       payload: userData
//     })
//   }

//   function logout() {
//     if (isBrowser) {
//       localStorage.removeItem('negocioToken')
//     }
//     dispatch({
//       type: "LOGOUT",
//     })
//   }

//   return (
//     <AuthContext.Provider
//       value={{ user: state.user, login, logout }}
//       {...props}
//     />
//   )
// }

// export { AuthContext, AuthProvider };
