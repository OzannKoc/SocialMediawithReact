import {useState, useEffect} from 'react'
import axios from "axios";
export const useApiProgress=(apiUrl)=>{

    const [pendingApiCall,setPendingApiCall] = useState(false);
    useEffect(()=>{
        let requestInterceptors, responseInterceptors ;

        const checkForUpdate=(path,apiProgress)=>{
            if(path === apiUrl){
                setPendingApiCall(apiProgress);
            }
        }
        const registerInterceptors=()=>{
            requestInterceptors = axios.interceptors.request.use(request =>{
            checkForUpdate(request.url,true);
                return request;
            });
    
           responseInterceptors = axios.interceptors.response.use(response=>{
                checkForUpdate(response.config.url,false);
                return response;
            },
            error=>{
                checkForUpdate(error.config.url,false);
                throw error;
            });
        }
        registerInterceptors();
        const unregisterInterceptor=()=>{
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        }
        return ()=>{
            unregisterInterceptor();
        } 
    });

    return pendingApiCall;
}




