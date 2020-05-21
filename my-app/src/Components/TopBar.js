import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import sm from "../Assets/sm.png";
import {useDispatch,useSelector} from "react-redux";
import {logoutSuccess} from "../Redux/authAction";

const TopBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {store} = useSelector((store)=>{
    return {
      store
    }
  })
  const onLogoutSuccess = ()=>{
    dispatch(logoutSuccess())
  }
  const {isLoggedIn,username} = store;
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
  link_ = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-link">
          <Link to={`/users/${username}`}> {username} </Link>
       </li>
      <li className="nav-link">
        <Link to="/" onClick={onLogoutSuccess} >{t("Logout")} </Link>
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
