import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ProfileCard =(props)=> {
    const pathUsername = props.match.params.username;
    const {username} = props;
    let message = "We can not edit";
    if(pathUsername ===username){
        message = "We can edit";
    }
    return (
        <div>
            {message}
        </div>
    )
}
const mapStatetoProps = (store)=>{
    return {
      username : store.username
    }
  }
export default connect(mapStatetoProps)( withRouter(ProfileCard));