import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { SIGN_IN_MUTATION } from "../../graphql/mutations"
import useAuth from "../../hooks/useAuth"
import Link from "next/link"

const initialForm = {
    email:'',
    password:''
}

export default function LoginPage(){
    const [form,setForm] = useState(initialForm)
    const [signIn,{data, loading, error}] = useMutation(SIGN_IN_MUTATION)
    const {login} = useAuth()
    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        signIn({variables:form})
    }
   useEffect(()=>{
    if(data){
        localStorage.setItem('token', JSON.stringify(data?.signIn.token))
        login(data?.signIn)
        setForm(initialForm)
    }
   },[data])
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            <h2 style={{color:'black'}}>Login Page</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width:'200px', gap:'20px'}}>
            <input required  onChange={handleChange}name='email' style={{backgroundColor:'white', color:'black', height:'30px'}} type={'email'} placeholder='Email'/>
            <input required onChange={handleChange} name='password' style={{backgroundColor:'white', color:'black', height:'30px'}}type={'password'}placeholder='Password'/>
            <input style={{backgroundColor:'#f50057', color:'white', border:'none', height:'30px'}}type={'submit'}placeholder='Ingresar'/>
            <Link style={{color:'#f50057'}} href='/user'>Volver</Link>
            </form>
        </div>
    )
}