import React, { Component } from 'react';
import Input from "../Components/Input";
import {withTranslation} from "react-i18next";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";
import { withApiProgress } from '../shared/ApiProgress';
import {signupHandler} from "../Redux/authAction";
import {connect} from "react-redux";

 class SignUpPage extends Component {
     state = {
         username : null,
         displayName : null,
         password : null,
         repeatedPassword : null,
         errors : {} 
     }
     onChangeInput =(e) => {
         const {t} = this.props;
         const {name, value} = e.target;
         const errors = {...this.state.errors};
         errors[name] = undefined ;
         if(name === "password" || name === "repeatedPassword"){
            if(name === "password" && value !== this.state.repeatedPassword){
                errors.passwordRepeat = t("Password mismatch");
            }
            else if (name === "repeatedPassword" && value !== this.state.password ){
                errors.passwordRepeat = t("Password mismatch");

            }else{
                errors.passwordRepeat = undefined;
            }
         }
         this.setState({
             [name] : value,
             errors
         })
     }
     
     onClickSignUp = async(e) => {
         e.preventDefault();
         const {username,displayName,password} = this.state;
         const {dispatch,history} = this.props;
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

                 this.setState({ errors : error.response.data.validationErrors })
             }
               
            
         }
        
     }
    render() {
        const {errors} = this.state;
        const {username,displayName,password,passwordRepeat} = errors;
        const { pendingApiCall,t } = this.props;
        return (
            <div className="container">
                <form>
                <h1 className="text-center">{t("Sign Up")}</h1>
                <Input name="username" label ={t("Username")} type ="text" onChange = {this.onChangeInput} error ={username}/>
                <Input name="displayName" label ={t("Display Name")} type ="text" onChange = {this.onChangeInput} error ={displayName}/>
                <Input name="password" label ={t("Password")} type ="password" onChange = {this.onChangeInput} error ={password}/>
                <Input name="repeatedPassword" label ={t("Password Repeat")} type ="password" onChange = {this.onChangeInput} error ={passwordRepeat}/>
                
                <div className="text-center">
                <ButtonWithSpinner  onClick = {this.onClickSignUp} 
                disabled={pendingApiCall || passwordRepeat}
                pendingApiCall = {pendingApiCall}
                buttonText={t("Sign Up")}/>
                
                </div>
                
                </form>
            </div>
        )
    }
}
const translatedSignUpPage = withTranslation()(SignUpPage);
const SignUpPagewithApiProgressForSignUpReq = withApiProgress(translatedSignUpPage,"/api/users");
const SignUpPagewithApiProgressForLoginReq = withApiProgress (SignUpPagewithApiProgressForSignUpReq,"/api/auth");
export default connect()(SignUpPagewithApiProgressForLoginReq);
