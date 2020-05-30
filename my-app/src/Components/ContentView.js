import React, { useState } from 'react';
import ProfileImageWithDefault from "./ProfilImageWithDefault";
import {Link} from "react-router-dom";
import {format} from 'timeago.js'
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux"
import { deleteContent } from '../Api/apiCall';
import Modal from './Modal';
import {useApiProgress} from '../shared/ApiProgress'

const ContentView = (props) => {
    const loggedInUser = useSelector((depo)=>{
        return depo.username});
    const{content:contentBody,onDeleteContent} = props
    const {user,content,timeStamp,fileAttachment,id} = contentBody
    const {image,username,displayName} = user
    const[isVisible ,setIsVisible] = useState(false);
    const {t,i18n} = useTranslation();
    const pendingApiCall = useApiProgress("delete",`/api/posts/${id}`,true);
    const formattedTime = format(timeStamp,i18n.language);
    const onclickDelete =async()=>{
        await deleteContent(id);
        onDeleteContent(id);
    }
    const onClickCancel = ()=>{
        setIsVisible(false);
    }    
    const ownedByLoggedInUser = loggedInUser ===username ;
    return (
        <>
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImageWithDefault className="rounded-circle m-1" image = {image} width="32" height="32" />
                <div className="flex-fill m-auto pl-2"> 
                    <Link to={`/users/${username}`} className="text-dark">
                        <h6 className="d-inline">
                        {displayName}@{username} 
                        </h6>
                        <span> - </span>
                        <span> {formattedTime} </span>
                    </Link>
                </div>
                    {ownedByLoggedInUser&&<button onClick={()=>setIsVisible(true)} className="btn btn-delete-btn btn-sm"><span className="material-icons">delete_outline</span></button>}
            </div>
            <div className="pl-5">{content} </div>
            {fileAttachment&&(
                <div className="pl-5">
                  {fileAttachment.fileType.startsWith("image") ? <img className="img-fluid" src={"/images/attachments/"+fileAttachment.name} alt={content}/>
                  : <video  src={"/images/attachments/"+fileAttachment.name} type={fileAttachment.fileType} controls autoPlay> </video>}  
                
                </div>
            )
            }
            
        </div>
        <Modal visible={isVisible} onClickOk={onclickDelete} onClickCancel={onClickCancel}
        pendingApiCall={pendingApiCall}
        message={
            <div>
                <div>
                    <strong>{t("Are you sure to delete content?")}</strong>
                </div>
                <span>
                    {content}
                </span>
            </div>
        }
        title={t("Delete Content")}/>
        </>
    )
}
export default ContentView;
