import * as ACTIONS from "./Constants";
const defaultState = {
    isLoggedIn : false,
    username : undefined,
    displayName : undefined,
    image : undefined,
    password : undefined
  }

const authReducer = (state={...defaultState},action)=>{
  if(action.type === ACTIONS.LOGOUT_SUCCESS){
    return defaultState ;
  }
  else if (action.type === ACTIONS.LOGIN_SUCCESS){
    state = {
      ...action.payload
    }
    return state;
  } 
  else if(action.type === ACTIONS.UPDATE_SUCCESS){
    state = {
      ...state,
      ...action.payload
    }
    return state;
  }
  return state;
}
export default authReducer;