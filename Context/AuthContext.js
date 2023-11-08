import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState, createContext, useEffect } from 'react';
import { client } from '../client';
import { GET_NEGOCIOVDOS_ONE, GET_USER } from '../graphql/queries';


export const AuthContext = createContext({
    user: undefined,
    login: () => { },
    logout: () => { },
    loading: undefined
})


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const result = useQuery(GET_USER)
    const [getNegocioVDosOne, result2] = useLazyQuery(GET_NEGOCIOVDOS_ONE)

    const login = () => {
        if (result?.loading) {
            setLoading(true)
        }
        getNegocioVDosOne()
        // if (result?.data?.getUser) {
        //     setUser(result?.data?.getUser)
        // }
        
        if(result2?.data?.getNegocioVDosOne){
            setUser(result2?.data?.getNegocioVDosOne)
        }
       
    }
    const logout = () => {
        setUser(null)

    }
    const getUser = async () => {
        try {
            // setUser(result?.data?.getUser)
            setUser(result2?.data?.getNegocioVDosOne)
            console.log(result2?.data?.getNegocioVDosOne);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser()
        // if (!token) {
        //     client.resetStore()
        // }
        if(result2){
            setUser(result2?.data?.getNegocioVDosOne)
        }
    }, [token, result2])
   useEffect(()=>{
    getNegocioVDosOne()

   },[])
    const valueContext = {
        user,
        login, logout, loading
    }
    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}