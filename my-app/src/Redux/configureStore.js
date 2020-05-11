import {createStore,applyMiddleware,compose} from "redux";
import authReducer from "./authReducer";
import SecureLs from "secure-ls";
import thunk from "redux-thunk";

const secureLs = new SecureLs();

const getStateInLocalStorage=()=>{
    const smAuth = secureLs.get("sm-auth");
    let stateInLocalStorage = {
        isLoggedIn : false,
        username : undefined,
        displayName : undefined,
        image : null,
        password : undefined
    }
    if(smAuth){
        return smAuth;
    }
    return stateInLocalStorage;
}

const updateStateInLocalStorage=(newState)=>{
    secureLs.set("sm-auth",newState);
}

const configureStore = () =>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store =createStore(authReducer,getStateInLocalStorage(),composeEnhancers(applyMiddleware(thunk))) ;
    store.subscribe(()=>{
        updateStateInLocalStorage(store.getState());
    })
    return store;
}

export default configureStore ();