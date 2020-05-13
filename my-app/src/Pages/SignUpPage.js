import React, { useState } from 'react';
import Input from "../Components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";
import { useApiProgress } from '../shared/ApiProgress';
import {signupHandler} from "../Redux/authAction";
import {useDispatch} from "react-redux";

 const SignUpPage =(props)=> {
    const [form,setForm] = useState({
    username : null,
    displayName : null,
    password : null,
    repeatedPassword : null
    });
    const[errors,setErrors] = useState({});
    const dispatch = useDispatch();
    const onChangeInput =(e) => {
         const {name, value} = e.target;
         setErrors((perviousErrors)=>{
             return{
                 ...perviousErrors,
                 [name] : undefined
             }
         });
         setForm((previousForm)=>{
             return {
                 ...previousForm,
                 [name] : value
             }
         }) 
         
     }
     
    const onClickSignUp = async(e) => {
         e.preventDefault();
         const {username,displayName,password} = form;
         const {history} = props;
         const {push} = history;
         const body = {
             username ,
             displayName ,
             password
         }
         
         try {
             await dispatch(signupHandler(body));
             push("/");
         }catch(error){
             if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
                 
             }
               
            
         }
        
     }
    const {t} = useTranslation();
     const {username,displayName,password} = errors;
     const pendingApiCallSignUp = useApiProgress("/api/users");
     const pendingApiCallLogin = useApiProgress ("/api/auth");
     const  pendingApiCall  = pendingApiCallSignUp || pendingApiCallLogin;
     let passwordRepeat ;
     if(form.password !== form.repeatedPassword){
         passwordRepeat = t("Password mismatch");
     }
     return (
         <div className="container">
             <form>
             <h1 className="text-center">{t("Sign Up")}</h1>
             <Input name="username" label ={t("Username")} type ="text" onChange = {onChangeInput} error ={username}/>
             <Input name="displayName" label ={t("Display Name")} type ="text" onChange = {onChangeInput} error ={displayName}/>
             <Input name="password" label ={t("Password")} type ="password" onChange = {onChangeInput} error ={password}/>
             <Input name="repeatedPassword" label ={t("Password Repeat")} type ="password" onChange = {onChangeInput} error ={passwordRepeat}/>
             
             <div className="text-center">
             <ButtonWithSpinner  onClick = {onClickSignUp} 
             disabled={pendingApiCall || passwordRepeat}
             pendingApiCall = {pendingApiCall}
             buttonText={t("Sign Up")}/>
             
             </div>
             
             </form>
         </div>
     )
    
}


export default SignUpPage;
