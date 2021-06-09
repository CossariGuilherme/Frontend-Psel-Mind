import React, { useState } from 'react'
import './Register.css'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import { MdEmail, MdLock, MdAccountCircle, MdDescription } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"


function Register() {
    const [nome, setNome] = useState("")
    const [CPF, setCPF] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setshow] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setshow(!show);
    }
    async function salvar() {
        return new Promise(async (resolve, rejected) => {
          try {
              const data = {
                username:nome,
                CPF:CPF,
                email:email,
                password:password,
                acesso: 1,
              }
            const response = await api.post('new',data);
            console.log(response);
            window.alert('Cadastro realizado com sucesso');
             resolve(response.data.data);
             setNome("")
             setCPF("")
             setEmail("")
             setPassword("")
          } catch (response) {
            console.log(response);
          }
        });
      }

    return (
        <div className="register">
            <div className="register-logo">

                <img
                    src="https://mindconsulting.com.br/wp-content/uploads/2020/01/bear-png.png"
                    alt="MdLockLogin App"
                />
            </div>

            <div className="register-right">
                <h1>Cadastrar Usuário</h1>

                <div className="register-registerInputNome">
                    <MdAccountCircle />
                    <input
                        type="nome"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </div>
                <div className="register-registerInputCPF">
                    <MdDescription />
                    <input
                        type="CPF"
                        placeholder="Digite seu CPF"
                        value={CPF}
                        onChange={e => setCPF(e.target.value)}
                    />
                </div>

                <div className="register-registerInputEmail">
                    <MdEmail />
                    <input
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="register-registerInputPassword">
                    <MdLock />
                    <input
                        placeholder="Digite sua senha"
                        type={show ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="register-eye">
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
                onClick={()=>{
                    salvar()
                    
                }}
                    type="submit">
                    Salvar
              </button>
                <Link to="/" style={{width:'100%', marginLeft:10}}>
                    
                    <button
                    
                        type="submit">
                        Voltar
            </button>
                </Link>

            </div>
        </div>
    )
}
export default Register