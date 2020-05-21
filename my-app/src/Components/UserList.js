import React,{useState, useEffect} from 'react';
import {getUsers} from "../Api/apiCall";
import {useTranslation} from "react-i18next";
import UserListItem from './UserListItem';
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from './Spinner';

const UserList = (props)=> {

    
    const [page, setPage] = useState({
        content:[],
        number : 0,
        size : 5         
    });
    const [loadFailure,setLoadFailure] = useState(false);
    
    const pendingApiCall = useApiProgress("get","/api/users?page");
    
    useEffect(()=>{ 
       loadUsers();   
    },[])
   
    const onClickNextPage =()=>{
        const  number = page.number+ 1 ;
        loadUsers(number);     
        }

    const onClickPreviousPage=()=>{
        const number = page.number- 1 ;
        loadUsers(number);     
    }

    const loadUsers = async (page)=>{
        setLoadFailure(false);
        try{
            const response = await getUsers(page);
                 setPage(response.data)

            }catch(error){
                setLoadFailure(true);
            };
            
    }
    
    const { content : users,last,first }  = page;
    const{ t }= useTranslation();
    let actionDiv = (
        <div>
            { 
                first===false &&
                <button className="btn btn-sm btn-light  " onClick={onClickPreviousPage} >{t("Previous")}</button>       
            }
            {
                last===false&&
                <button className="btn btn-sm btn-light float-right " onClick={onClickNextPage} >{t("Next")}</button>
            }
            </div>
    )
    if(pendingApiCall){
        actionDiv = (
            <Spinner/>
        )
    }
    return (
        <div className="card">
            <div className="card-header text-center">{t("Users")}</div> 
            <div className="list-group-flush">
            {
                users.map(user =>{
                    return(
                        <UserListItem key = {user.username} user = {user} />
                        )
                        })
            }
            </div>
            {
                actionDiv
            }
            {
                loadFailure && <div className="text-center text-danger">{t("Load Failure")}</div>
            }
            
        </div>
    )
    
}
export default UserList;
