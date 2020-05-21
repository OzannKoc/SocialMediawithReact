import React,{useState, useEffect} from 'react';
import ProfileCard from "./ProfileCard";
import {getUser} from "../Api/apiCall";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../Components/Spinner';
const UserPage = ()=>{
    const [user,setUser]=useState({});
    const [notFound,setNotFound] = useState(false);
    const { t } = useTranslation();
    const {username} = useParams();
    const pendingApiCall = useApiProgress("get","/api/users/"+username);
    useEffect(()=>{
        setNotFound(false);
    },[user])
    
    useEffect(()=>{
        const loadUser = async()=>{
            try{
                const response =await getUser(username);
                setUser(response.data);
            }catch(error){
                setNotFound(true);
            }
        }
        loadUser();

    },[username]);
    if(pendingApiCall){
        return(
            <Spinner/>
        )
    }
    if(notFound){
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                    <span className="material-icons" style={{fontSize :"48px"}}>
                        error
                        </span> 
                    </div>
                {t("User not found")}
                
                </div>
                
                
            </div>
        )
    }

    return (
        
        <div className="container">
            <ProfileCard user = {user}/>
        </div>
    )
    
}

export default UserPage;