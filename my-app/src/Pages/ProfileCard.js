import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard =(props)=> {
    const routerParams = useParams();
    const pathUsername = routerParams.username;
    const {username} = useSelector((store)=>{
        return {
            username : store.username
        }
    });
    let message = "We can not edit";
    if(pathUsername ===username){
        message = "We can edit";
    }
    return (
        <div>
            {message}
        </div>
    )
}

export default ProfileCard;