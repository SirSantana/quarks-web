import { useQuery } from '@apollo/client';
import React, {useState, createContext, useEffect}from 'react';
import { client } from '../client';
import { GET_USER } from '../graphql/queries';


export const AuthContext = createContext({
    user:undefined,
    login:()=>{},
    logout:()=>{},
    loading:undefined
})


export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const result = useQuery(GET_USER)

    const login=()=>{
        if(result?.loading){
            setLoading(true)
        }
        if(result?.data?.getUser){
            setUser(result?.data?.getUser)
        }
    }
    const logout = ()=>{
    setUser(null)
    
    }
    const getUser = async () => {
        try {
          setUser(result?.data?.getUser)
        } catch (error) {
         console.log(error); 
        }
      };
    useEffect(()=>{
         getUser()
         if(!token){
            client.resetStore()
         }
    },[result, token])
    const valueContext={
        user,
        login, logout, loading
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}