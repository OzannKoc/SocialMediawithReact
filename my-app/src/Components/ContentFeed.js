import React, { useState, useEffect } from 'react';
import {getBitchy} from "../Api/apiCall";
import { useTranslation } from 'react-i18next';
import ContentView from "./ContentView";
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const ContentFeed = () => {
    const [contentPage,setContentFeed] = useState({content:[],last:true,number:0});
    const {username} = useParams();
    const path = username ? `/api/users/${username}/posts?page=`:"/api/posts?page=";
    const pendingApiCall = useApiProgress("get",path);
    useEffect(()=>{
        loadContent();
    },[])
    const loadContent = async(page)=>{
        try{
            const response = await getBitchy(username,page);
            setContentFeed((previousContentPage)=>{
                return {
                    ...response.data,
                    content : [...previousContentPage.content , ...response.data.content]
                }
            });
        }catch(error){

        }
    }
    const{content,last,number} = contentPage;
    const {t} = useTranslation();
    
    if(content.length===0){
        return(
            <div className="alert alert-secondary text-center">{pendingApiCall? <Spinner/>:t("There is no content")}</div>
        )
    }
    return (
        <div>
            {
                content.map(iteratedContent=>{
                    return(
                        <ContentView key={iteratedContent.id} content={iteratedContent}/>
                    )
                })
            }
            {!last&&<div style={{cursor: pendingApiCall? "not-allowed": "pointer"}} 
            onClick={pendingApiCall?()=>{}:()=>{loadContent(number+1)}} 
            className="alert alert-secondary text-center">{pendingApiCall? <Spinner/>:t("Show contents")}</div>}
        </div>
    )
}
export default ContentFeed ;
