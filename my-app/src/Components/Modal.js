import React from 'react'
import { useTranslation } from 'react-i18next';
import ButtonWithSpinner from './ButtonWithSpinner';

 const Modal=(props) =>{
     const {visible,message,onClickOk,onClickCancel,pendingApiCall,title} = props;
     const {t} = useTranslation();
     let className ="modal fade";
     if(visible){
        className +=" show d-block"
     }
    return (
        <div className={className} style={{background : "#000000b0"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    {title&&<div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>}
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <ButtonWithSpinner onClick={onClickOk} pendingApiCall={pendingApiCall} disabled={pendingApiCall} className="btn btn-danger" buttonText={t("Ok")}/>
                        <button  className="btn btn-secondary" onClick={onClickCancel} disabled={pendingApiCall} >{t("Close")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;