import * as ACTONS from "./Constants";
const defaultState = {
    isLoggedIn : false,
    username : undefined,
    displayName : undefined,
    image : undefined,
    password : undefined
  }

const authReducer = (state,action)=>{
  if(action.type === ACTONS.LOGOUT_SUCCESS){
    return defaultState ;
  }
  else if (action.type === ACTONS.LOGIN_SUCCESS){
    state = {
      ...action.payload
    }
    return state;
  } 
  return state;
}
export default authReducer;