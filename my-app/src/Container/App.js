import React from "react";
import LoginPage from "../Pages/LoginPage";
import LanguageSelector from "../Components/LanguageSelector";
import SignUpPage from "../Pages/SignUpPage";
import HomePage from "../Pages/HomePage";
import UserPage from "../Pages/UserPage";
import {HashRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import TopBar from "../Components/TopBar";
import { useSelector } from "react-redux";
const App =() => {
  
  const { isLoggedIn } = useSelector((store)=>{
    return{
      isLoggedIn : store.isLoggedIn
    }
  });

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn ? <Route path="/login" component={LoginPage} /> : null}
          <Route path="/signup" component={SignUpPage} />
          <Route path="/users/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );
  
}



export default App;
