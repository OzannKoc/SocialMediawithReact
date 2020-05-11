import React, { Component} from 'react'
import axios from "axios";

function getDisplayName(WrappedComponent){
    return WrappedComponent.name || WrappedComponent.displayName || "Component";
}

export function withApiProgress(WrappedComponent ,apiUrl) {
 
    return class extends Component {

        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        state = {
            pendingApiCall : false
        }
        componentDidMount(){
    
            this.requestInterceptors = axios.interceptors.request.use(request =>{
                this.checkForUpdate(request.url,true);
                return request;
            });
    
           this.responseInterceptors = axios.interceptors.response.use(response=>{
                this.checkForUpdate(response.config.url,false);
                return response;
            },
            error=>{
                this.checkForUpdate(error.config.url,false);
                throw error;
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }
        checkForUpdate=(path,pendingApiCall)=>{
            if(path === apiUrl){
                this.setState({pendingApiCall})
            }
        }
        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall ;
            return <WrappedComponent {...this.props} pendingApiCall= {pendingApiCall} />
        }
    }
    
}

