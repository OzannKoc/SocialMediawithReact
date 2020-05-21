import React from 'react';
import {Link} from "react-router-dom";
import ProfilImageWithDefault from "./ProfilImageWithDefault";

export default function UserListItem(props) {
    const { user} = props;
    const {username, displayName, image } = user ;
    return (
        <Link to = {`/users/${username}`}
         className="list-group-item list-group-item-action"  >
         <ProfilImageWithDefault image={image} height="32" width="32" className="rounded-circle" username={username} />
         <span className="pl-2">{displayName}@{username}</span>
        </Link>
    )
}
