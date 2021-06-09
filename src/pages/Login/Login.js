import React, { useState } from 'react'
import './Login.css'
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import {login} from '../../services/auth'
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import {acesso} from '../../services/auth'
import { Message } from '@material-ui/icons'


function Login() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)
   const history = useHistory()

   const handleClick = (e) => {
      e.preventDefault()
      setShow(!show);
   }

   async function loginUser(){
    try{
      const data={
         email:email,
         password:password
      }    
        
      const response = await api.post("sessions",data)
      
      console.log('Login realizado')
      login(response.data.token, response.data.user.id, response.data.user.acesso)
      if(acesso()==999){
      history.push('/User')
      }
      else if(acesso()==1){
      history.push('/User')   
      }else{
      window.alert('Usuario desativado')
      }
      
   }catch(err){
      console.log('Falha de login')
      window.alert('Usuário e senha inválidos');
   }   
}


   return (
      <div className="login">
         <div className="login-logo">
         
            <img              
               src="https://mindconsulting.com.br/wp-content/uploads/2020/01/bear-png.png"
               alt="MdLockLogin App"
            />
         </div> 

         <div className="login-right">
            <h1>Acessar</h1>

            <div className="login-loginInputEmail">
               <MdEmail />
               <input
                  type="email"
                  placeholder="Digite um email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="login-loginInputPassword">
               <MdLock />
               <input
                  placeholder="Digite sua senha"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
               <div className="login-eye">
                  {show ? (
                     <HiEye
                        size={20}
                        onClick={handleClick}
                     />
                  ) : (
                        <HiEyeOff
                           size={20}
                           onClick={handleClick}
                        />
                     )}
               </div>
            </div>
           
               
          
            <button
            
            onClick={()=>loginUser()} 
            
            type="submit">
               Entrar
            </button>
  
            <Link to="/Register" style={{width:'100%', marginLeft:10}}>
            <button            
            type="submit">
               Cadastre-se
            </button>
          </Link> 
         </div>
         </div>
   )
}

export default Login