import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilImageWithDefault from "../Components/ProfilImageWithDefault";
import  Input from "../Components/Input";
import { useTranslation } from 'react-i18next';
import {updateUser} from "../Api/apiCall";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";

const ProfileCard =(props)=> {
    const routerParams = useParams();
    const pathUsername = routerParams.username;
    const [inEditMode,setinEditMode]=useState(false);
    const [updatedDisplayName,setUpdatedDisplayName] = useState();
    const[newImage,setNewImage] = useState();
    const[user,setUser] = useState({});
    useEffect(()=>{
        setUser({...props.user})
    },[props.user]);

    const {username} = useSelector((store)=>{
        return {
            username : store.username
        }
    });
    
    const [editable,setEditable]=useState(false);
    useEffect(()=>{
        setEditable(pathUsername ===username)
    },[pathUsername,username]);

    const{username:kullanıcıAdı,displayName,image} = user;
    const {t} = useTranslation(); 
    const pendingApiCall = useApiProgress("put",`/api/users/`+kullanıcıAdı);

    useEffect(()=>{
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        }else{
            setUpdatedDisplayName(displayName);
        }

    },[inEditMode,displayName])
    const onClickSave = async()=>{
        let image ;
        if(newImage){
            image = newImage.split(",")[1];
        }

        const body ={
                displayName : updatedDisplayName,
                image 
            }
        try{
         const response = await updateUser (kullanıcıAdı,body);
         setinEditMode(false);
         setUser(response.data);
        }catch(error){

        }
    }
    const onChangeFile = (event)=>{
        if(event.target.files.lenght<1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend=()=>{
            setNewImage(fileReader.result);
        }
    }
    
    
    return (
        <div>
           <div className="card text-center">
                <div className="card-header">
                    <ProfilImageWithDefault image ={image} 
                    height="200" width ="200"
                    className="rounded-circle shadow" 
                    username={kullanıcıAdı} tempimage={newImage} />
                </div>
                <div className="card-body" >
                   { 
                   !inEditMode&&<><h3>
                        {displayName}@{kullanıcıAdı}
                    </h3>
                    {editable&&<button className="btn btn-success d-inline-flex" onClick={()=>{setinEditMode(true)}}>
                    <span className="material-icons">create</span>
                    {t("Edit")} </button>}
                    </>}
                    {
                     inEditMode &&
                     <div>
                         <Input label={t("Change Display Name")} defaultValue={displayName} onChange={(event)=>{setUpdatedDisplayName(event.target.value)}}/>
                         <input type="file" onChange={onChangeFile}/>
                         <div>
                         <ButtonWithSpinner onClick={onClickSave} 
                         className="btn btn-primary d-inline-flex"
                         disabled = {pendingApiCall}
                         pendingApiCall = {pendingApiCall}
                         buttonText ={
                             <>
                                <span className="material-icons">save</span>
                                {t("Save")}
                             </>
                         }/>
                         
                         <button onClick={()=>{setinEditMode(false)}}className="btn btn-light d-inline-flex ml-2" disabled={pendingApiCall}><span className="material-icons">close</span>
                         {t("Cancel")}</button>
                         </div>
                     </div>   
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;