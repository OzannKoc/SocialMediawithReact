import React from 'react';
import UserList from "../Components/UserList";
import SharingArea from '../Components/SharingArea';
import { useSelector } from 'react-redux';

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
                   { isLoggedIn && <SharingArea/>}
                </div>
                <div className="col">
                    <UserList/>

                </div>
            </div>
        </div>
    )
}
export default HomePage;
