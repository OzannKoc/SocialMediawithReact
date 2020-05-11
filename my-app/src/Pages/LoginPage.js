import React, { Component } from 'react';
import Input from "../Components/Input"; 
import {withTranslation} from "react-i18next";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from "react-redux";
import { loginHandler} from '../Redux/authAction';





class LoginPage extends Component {
    state={
        username:"",
        password :"",
        error : null
    }
    onChangeInput =(e)=>{
        const {name,value} = e.target;

        this.setState({
            [name] : value,
            error : null
        });

    }
    
    onLogin=async(e)=>{
        e.preventDefault();
        const {username,password} =this.state;
        const creds ={
            username,
            password
        };
        const {dispatch,history} = this.props;
        const {push} = history;
        this.setState({
            error : null
        })
        try {
           await dispatch(loginHandler(creds));
           
           push("/");
           
        }catch(error){
            this.setState({
                error : error.response.data.message 
            })      
        }
        
    }
    
    render() {
        const {error,username,password} = this.state;
        const emptyFieldCase = username&&password;
        const{t,pendingApiCall} = this.props;
        return (
            <div className="container">
                <form>
                <h1 className="text-center" >{t("Login")}</h1>
                
                <Input name="username" label ={t("Username")} type ="text" onChange = {this.onChangeInput} />
                <Input name="password" label ={t("Password")} type ="password" onChange = {this.onChangeInput}/>
                <div className="text-center">
                {error &&
                <div className="alert alert-danger" >
                {error}
                </div>
                }
                <ButtonWithSpinner onClick={this.onLogin} 
                disabled={pendingApiCall||!emptyFieldCase}
                pendingApiCall = {pendingApiCall} 
                buttonText={t("Sign in")}/>
                    
                </div>
                </form>
            </div>
        )
    }
}
const translatedLoginPage = withTranslation()(LoginPage);
const LoginPagewithApiProgress = withApiProgress(translatedLoginPage,"/api/auth");

export default  connect()(LoginPagewithApiProgress);