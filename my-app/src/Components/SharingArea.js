import React, { useState, useEffect } from 'react';
import ButtonWithSpinner from "./ButtonWithSpinner";
import ProfilImageWithDefault from './ProfilImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {postBitchy} from '../Api/apiCall';
import { useApiProgress } from '../shared/ApiProgress';

const SharingArea=()=> {
    const{image} = useSelector((store)=>{return({ image : store.image})});
    const[focused,setFocused] = useState(false);
    const[Bitchy,setBitchy] = useState("");
    const[errors,setErrors] = useState({});
    const pendingApiCall = useApiProgress("post","/api/posts");
    useEffect(()=>{
        if(!focused){
            setBitchy("");
            setErrors({});
        } 
    },[focused])

    useEffect(()=>{
        setErrors({});
    },[Bitchy]);

    const onClickShare = async()=>{
        const body ={
            content : Bitchy
        }
        try{
           await postBitchy(body);
           setFocused(false);
        }catch(error){
            setErrors(error.response.data.validationErrors);
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
                {focused&&<div className="text-right mt-1">
                    <ButtonWithSpinner className="btn btn-primary" 
                    onClick={onClickShare}
                    buttonText="Bitchy"
                    pendingApiCall={pendingApiCall}
                    disabled={pendingApiCall}/>
                    <button onClick={()=>{setFocused(false)}}className="btn btn-light d-inline-flex ml-2" disabled={pendingApiCall}><span className="material-icons">close</span>
                         {t("Cancel")}</button>
                </div>}
            </div>
            
        </div>
    )
}
export default SharingArea;
