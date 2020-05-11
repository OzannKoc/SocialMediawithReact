import React, { Component } from "react";
import LoginPage from "../Pages/LoginPage";
import LanguageSelector from "../Components/LanguageSelector";
import SignUpPage from "../Pages/SignUpPage";
import HomePage from "../Pages/HomePage";
import UserPage from "../Pages/UserPage";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TopBar from "../Components/TopBar";
import { connect } from "react-redux";
class App extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn ? <Route path="/login" component={LoginPage} /> : null}
            <Route path="/signup" component={SignUpPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}
const mapStatetoProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStatetoProps)(App);
