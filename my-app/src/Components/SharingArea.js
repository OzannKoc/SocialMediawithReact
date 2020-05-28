import React, { useState, useEffect } from 'react';
import ButtonWithSpinner from "./ButtonWithSpinner";
import ProfilImageWithDefault from './ProfilImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {postBitchy, uploadAttachmentFile} from '../Api/apiCall';
import { useApiProgress } from '../shared/ApiProgress';
import Input from "./Input";
import UploadFile from './UploadFile';

const SharingArea=()=> {
    const{image} = useSelector((store)=>{return({ image : store.image})});
    const[focused,setFocused] = useState(false);
    const[Bitchy,setBitchy] = useState("");
    const[errors,setErrors] = useState({});
    const[newImage,setNewImage] = useState();
    const[attachmentId,setAttachmentId] = useState();
    const pendingApiCall = useApiProgress("post","/api/posts",true);
    const uploadingFileProgress = useApiProgress("post","/api/posts/attachment-post",true)
    useEffect(()=>{
        if(!focused){
            setBitchy("");
            setErrors({});
            setNewImage();
            setAttachmentId();
        } 
    },[focused])

    useEffect(()=>{
        setErrors({});
    },[Bitchy]);

    const onClickShare = async()=>{
        const body ={
            content : Bitchy,
            attachmentId : attachmentId
        }
        try{
           await postBitchy(body);
           setFocused(false);
        }catch(error){
            setErrors(error.response.data.validationErrors);
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
            uploadFile(file);
        }
    }
    const uploadFile =async (file)=>{
        const attachment = new FormData();
        attachment.append("file",file);
        try{
           const response = await uploadAttachmentFile(attachment);
           setAttachmentId(response.data.id);
        }catch(error){

        }
    }
    const{t} =useTranslation();
    let textAreaClass = "form-control";
    if(errors.content){
        textAreaClass += " is-invalid";
    }
    return (
        <div className="card p-1 flex-row">
                <ProfilImageWithDefault className="rounded-circle mr-1" image={image} height="32" width="32" />
            <div className="flex-fill">
                <textarea className={textAreaClass} rows={focused?"3":"1"} 
                onFocus={()=>{setFocused(true)}}
                onChange={(e)=>{setBitchy(e.target.value)}}
                value={Bitchy} />
                <div className="invalid-feedback">{errors.content}</div>
                {focused&&<>
                {!newImage&&<Input type="file" onChange={onChangeFile}  />}
                {newImage&&<UploadFile image={newImage} uploadingProgress={uploadingFileProgress}/>}
                <div className="text-right mt-1">
                    <ButtonWithSpinner className="btn btn-primary" 
                    onClick={onClickShare}
                    buttonText={t("Share")}
                    pendingApiCall={pendingApiCall}
                    disabled={pendingApiCall || uploadingFileProgress}/>
                    <button onClick={()=>{setFocused(false)}}className="btn btn-light d-inline-flex ml-2" disabled={pendingApiCall || uploadingFileProgress}><span className="material-icons">close</span>
                         {t("Cancel")}</button>
                </div>
                </>}
            </div>
            
        </div>
    )
}
export default SharingArea;
