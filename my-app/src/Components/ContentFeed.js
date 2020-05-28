import React, { useState, useEffect } from 'react';
import {getBitchy, getOldBitchy, getNewBitchyCount, getNewBitchy} from "../Api/apiCall";
import { useTranslation } from 'react-i18next';
import ContentView from "./ContentView";
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const ContentFeed = () => {
    const [contentPage,setContentFeed] = useState({content:[],last:true,number:0});
    const[newContentsCount,setNewContentsCount] = useState(0);
    const {username} = useParams();
    const path = username ? `/api/users/${username}/posts?page=`:"/api/posts?page=";
    const initialLoadContentsProgress = useApiProgress("get",path);
    let oldContentId = 0 ;
    let firstContendId = 0 ;
    if(contentPage.content.length>1){
        firstContendId = contentPage.content[0].id;
        const oldContentIndex = contentPage.content.length-1;
        oldContentId = contentPage.content[oldContentIndex].id;
    }
    const oldContentPath = username ? `/api/users/${username}/posts/` : "/api/posts/" ;
    const loadOldContentProgress = useApiProgress("get",oldContentPath+oldContentId,true);
    const newContentPath = username ? `/api/users/${username}/posts/${firstContendId}?direction=after` : `/api/posts/${firstContendId}?direction=after`;
    const newContentProgress = useApiProgress("get",newContentPath,true)

    useEffect(()=>{
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
        loadContent();
    },[username])
    useEffect(()=>{
        const loadNewContentCount = async()=>{
            try{
                const response = await getNewBitchyCount(firstContendId,username);
                setNewContentsCount(response.data.count);
            }catch(error){

            }
        }
        const looper = setInterval(loadNewContentCount,6000);
        return ()=>{clearInterval(looper)}
    },[firstContendId,username]);

    const loadOldContent = async()=>{
        try{
            const response = await getOldBitchy(oldContentId,username);
            setContentFeed((previousContentPage)=>{
                return {
                    ...response.data,
                    content : [...previousContentPage.content , ...response.data.content]
                }
            });
        }catch(error){

        }
    }
    const loadNewContent = async()=>{
        
        try{
            const response = await getNewBitchy(firstContendId,username);
            setContentFeed((previousContentPage)=>{
                return {
                    ...previousContentPage,
                    content : [ ...response.data,...previousContentPage.content]
                }
            });
            setNewContentsCount(0);
        }catch(error){

        }
        
    }
    const{content,last} = contentPage;
    const {t} = useTranslation();
    
    if(content.length===0){
        return(
            <div className="alert alert-secondary text-center">{initialLoadContentsProgress? <Spinner/>:t("There is no content")}</div>
        )
    }
    return (
        <div>
            {newContentsCount>0 && <div className="alert alert-secondary text-center mb-1" 
            style={{cursor: newContentProgress? "not-allowed": "pointer"}}
            onClick={newContentProgress?()=>{}:loadNewContent}>{newContentProgress?<Spinner/>:t("There are new content")}</div>}
            {
                content.map(iteratedContent=>{
                    return(
                        <ContentView key={iteratedContent.id} content={iteratedContent}/>
                    )
                })
            }
            {!last&&<div style={{cursor: loadOldContentProgress? "not-allowed": "pointer"}} 
            onClick={loadOldContentProgress?()=>{}:loadOldContent} 
            className="alert alert-secondary text-center">{loadOldContentProgress? <Spinner/>:t("Show contents")}</div>}
        </div>
    )
}
export default ContentFeed ;
