import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import sm from "../Assets/sm.png";
import {useDispatch,useSelector} from "react-redux";
import {logoutSuccess} from "../Redux/authAction";
import ProfilImageWithDefault from "./ProfilImageWithDefault";

const TopBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {store} = useSelector((store)=>{
    return {
      store
    }
  })
  const {isLoggedIn,username,displayName,image} = store;
  const [menuVisible,setMenuVisible]=useState(false);
  const menuRef = useRef(null);
  useEffect(()=>{
    document.addEventListener("click",menuClickTracker)
    return ()=>{document.removeEventListener("click",menuClickTracker)}; 
  },[isLoggedIn])

  const menuClickTracker =(event)=>{
    if(menuRef.current===null || !menuRef.current.contains(event.target)){
      setMenuVisible(false)
    }

  }
  const onLogoutSuccess = ()=>{
    dispatch(logoutSuccess())
  }
  
  let link_ = (
  <ul className="navbar-nav ml-auto">
      <li className="nav-link">
        <Link to="/login"> {t("Login")} </Link>
       </li>
      <li className="nav-link">
        <Link to="/signup">{t("Sign Up")} </Link>
      </li>
  </ul>
);
if(isLoggedIn){
  let menuClass = "dropdown-menu p-0 shadow"
  if(menuVisible){
    menuClass +=" show"
  }
  link_ = (
    <ul className="navbar-nav ml-auto" ref={menuRef}>
      <li className="nav-item dropdown">
        <div className="d-flex" style={{cursor:"pointer"}} onClick={()=>{setMenuVisible(true)}}>
        <ProfilImageWithDefault image={image} width="32" height="32" className="rounded-circle" />
        <span className="nav-link dropdown-toggle" >{displayName}</span>
        </div>
        <div className={menuClass} >
          <Link className="dropdown-item d-flex p-2" to={`/users/${username}`} onClick={()=>{setMenuVisible(false)}}>
            <span className="material-icons text-info mr-2">account_circle</span> {t("My Profile")} </Link>
          <Link className="dropdown-item d-flex p-2" to="/" onClick={onLogoutSuccess} >
            <span className="material-icons text-danger mr-2">power_settings_new</span>{t("Logout")} </Link>
        </div>
      </li>
  </ul>
  );
}
return (
  <div className="shadow-sm bg-light mb-2">
    <nav className="navbar navbar-light container navbar-expand">
      <Link className="navbar-brand" to="/">
          <img src={sm} alt="sm" width="80"/>
        Hello Bitches!
      </Link>
      {link_}
    </nav>
    
  </div>
);
  
  
}

export default TopBar; 
