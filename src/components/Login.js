import logo from "../assets/images/full-logo.svg"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ ticket, setTicket ] =useState(null);
  const [ token, setToken ] =useState(null);
  const [ accessDenied, setAccessDenied ] =useState(false);
  const navigate = useNavigate();
  
  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post('https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets', {
        "userId": data.username,
        "password": data.password
      });
      console.log(response)
      setTicket(response.data.entry.id);
    } catch (error) {
      setAccessDenied(true);
    }
  }
  useEffect(() => {
    if(ticket){
      localStorage.setItem('ticket', ticket);
      const generatedToken = btoa(`ROLE_TICKET:${ticket}`);
      localStorage.setItem('token',generatedToken);
      setToken(generatedToken);
      if(token){
        navigate("/personal-files");
      }
    }
  }, [ticket, token]);
  return (
    <div className='login-page'>
      <div className="login-form">
        <img src={logo} alt="logo" className="login-logo"/>
        <p className={accessDenied ? 'visible' : 'hidden' }>You've entered an unknown username or password</p>
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="input">
            <input 
              type="text" 
              placeholder="Username" 
              {...register("username", { required: 'Username is Required!' })}
            />
            <p className={(errors.username) ? 'visible' : 'hidden' }>{errors.username?.message}</p>

          </div>
          <div className="input">
            <input 
              type="text" 
              placeholder="Password" 
              {...register("password", { required: 'Enter your password to log in!' })}
            />
            <p className={(errors.password) ? 'visible' : 'hidden' }>{errors.password?.message}</p>
          </div>
          <button type="submit" >Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login