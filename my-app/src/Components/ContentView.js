import React from 'react';
import ProfileImageWithDefault from "./ProfilImageWithDefault";
import {Link} from "react-router-dom";
import {format} from 'timeago.js'
import { useTranslation } from 'react-i18next';

const ContentView = (props) => {
    const{content:contentBody} = props
    const {user,content,timeStamp} = contentBody
    const {image,username,displayName} = user
    const {i18n} = useTranslation();
    const formattedTime = format(timeStamp,i18n.language);
    return (
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
            </div>
            <div className="pl-5">
            {content}
            </div>
        </div>
    )
}
export default ContentView;
