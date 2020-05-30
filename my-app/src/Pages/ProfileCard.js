import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfilImageWithDefault from "../Components/ProfilImageWithDefault";
import  Input from "../Components/Input";
import { useTranslation } from 'react-i18next';
import {updateUser, deleteUser} from "../Api/apiCall";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithSpinner from "../Components/ButtonWithSpinner";
import {updateSuccess} from "../Redux/authAction";
import Modal from '../Components/Modal';
import {logoutSuccess} from "../Redux/authAction";

const ProfileCard =(props)=> {
    const dispatch = useDispatch();
    const routerParams = useParams();
    const pathUsername = routerParams.username;
    const [inEditMode,setinEditMode]=useState(false);
    const [updatedDisplayName,setUpdatedDisplayName] = useState();
    const[newImage,setNewImage] = useState();
    const[validationErrors,setValidationErrors]=useState({});
    const[user,setUser] = useState({});
    const[isVisible , setIsVisible]= useState(false);
    const history = useHistory();
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
    useEffect(()=>{
        setValidationErrors((previousValidationErrors)=>{
            return {
                ...previousValidationErrors,
                displayName : undefined
            }
        })
    },[updatedDisplayName])
    useEffect(()=>{
        setValidationErrors((previousValidationErrors)=>{
            return {
                ...previousValidationErrors,
                image : undefined
            }
        })
    },[newImage])
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
         dispatch(updateSuccess(response.data));
        }catch(error){
            setValidationErrors(error.response.data.validationErrors);
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
    const onClickDeleteUser = async()=>{
        await deleteUser(username);
        setIsVisible(false);
        dispatch(logoutSuccess());
        history.push("/");

    }

    const{displayName:displayNameError,image : imageError} = validationErrors;
    const pendingApiCallDeleteUser = useApiProgress("delete",`/api/users/${username}`);
    return (
        <>
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
                    {editable&&<><div><button className="btn btn-success d-inline-flex" onClick={()=>{setinEditMode(true)}}>
                    <span className="material-icons">create</span>
                    {t("Edit")} </button></div>
                    <div className="pt-1">
                    <ButtonWithSpinner 
                    onClick={()=> setIsVisible(true)}
                    className="btn btn-danger btn-sm d-inline-flex"
                     buttonText={<div className="d-inline-flex" ><span className="material-icons mr-2">
                            person_remove
                            </span>{t("Delete My Account")}</div>}/>
                    </div></>}
                    </>}
                    {
                     inEditMode &&
                     <div>
                         <Input label={t("Change Display Name")} defaultValue={displayName} 
                         onChange={(event)=>{setUpdatedDisplayName(event.target.value)}} error={displayNameError}/>
                         <Input type="file" onChange={onChangeFile} error={imageError}/>
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
        <Modal 
        visible={isVisible}
        onClickOk={onClickDeleteUser}
        onClickCancel={()=>setIsVisible(false)} 
        message={
            <div>
                    <strong>{t("Are you sure to delete your account?")}</strong>
            </div>
        }
        pendingApiCall={pendingApiCallDeleteUser}/>
        </>
    )
}

export default ProfileCard;