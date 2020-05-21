import React, { useState,useEffect } from 'react';
import Input from "../Components/Input"; 
import {useTranslation} from "react-i18next";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";
import {useApiProgress} from "../shared/ApiProgress";
import {useDispatch} from "react-redux";
import { loginHandler} from '../Redux/authAction';


const LoginPage = (props) => {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        setError(undefined);
    },[username,password]);
    
    const onLogin=async(e)=>{
        e.preventDefault();
        const creds ={
            username,
            password
        };
        const {history} = props;
        const {push} = history;
        setError(undefined);
        try {
           await dispatch(loginHandler(creds));
           
           push("/");
           
        }catch(error){
            setError(error.response.data.message);      
        }

        
    }
    
    const{ t } = useTranslation();
    const emptyFieldCase = username&&password;
    const pendingApiCall = useApiProgress("post","/api/auth");
    return (
        <div className="container">
            <form>
            <h1 className="text-center" >{t("Login")}</h1>
            
            <Input name="username" label ={t("Username")} type ="text" onChange = {(e)=>setUsername(e.target.value)} />
            <Input name="password" label ={t("Password")} type ="password" onChange = {(e)=>setPassword(e.target.value)}/>
            <div className="text-center">
            {error &&
            <div className="alert alert-danger" >
            {error}
            </div>
            }
            <ButtonWithSpinner onClick={onLogin} 
            disabled={pendingApiCall||!emptyFieldCase}
            pendingApiCall = {pendingApiCall} 
            buttonText={t("Sign in")}/>
                
            </div>
            </form>
        </div>
    )
    
}


export default  LoginPage;