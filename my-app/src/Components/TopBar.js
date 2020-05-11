import React, { Component } from "react";
import {Link} from "react-router-dom";
import { withTranslation } from "react-i18next";
import sm from "../Assets/sm.png";
import {connect} from "react-redux";
import {logoutSuccess} from "../Redux/authAction";

class TopBar extends Component {

 
  render() {
      const {t,store,onLogoutSuccess} = this.props;
      const {isLoggedIn,displayName,username} = store;
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
              <Link to={`/user/${username}`}> {displayName} </Link>
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
}
const TopBarwithTranslation = withTranslation()(TopBar);
const mapStatetoProps = (store)=>{
  return {
    store
  }
}
const mapDispatchtoProps = (dispatch) =>{
  return {
    onLogoutSuccess : () =>{
       return dispatch(logoutSuccess())
  }
}
}

export default connect(mapStatetoProps,mapDispatchtoProps)(TopBarwithTranslation); 
