import React from 'react';
import UserList from "../Components/UserList";
import SharingArea from '../Components/SharingArea';
import { useSelector } from 'react-redux';
import ContentFeed from '../Components/ContentFeed';

const HomePage=()=> {
    const{isLoggedIn} = useSelector((store)=>{
        return({
            isLoggedIn : store.isLoggedIn
        })
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="mb-1">
                   { isLoggedIn && <SharingArea/>}
                    </div>
                   <ContentFeed/>
                </div>
                <div className="col">
                    <UserList/>

                </div>
            </div>
        </div>
    )
}
export default HomePage;
