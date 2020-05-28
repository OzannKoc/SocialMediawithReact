import React from 'react';
import "./UploadFile.css";

export default function UploadFile(props) {
    const {image,uploadingProgress} = props
    return (
        <div style={{position :"relative"}}>
            <img src={image} className="img-thumbnail" alt="attachment-content"/>
            <div className="overlay" style={{opacity :uploadingProgress ? 1 : 0}}>
            <div className="d-flex justify-content-center h-100">
                <div className="spinner-border text-light m-auto" >     
                </div>
            </div>
            </div>
        </div>
    )
}
