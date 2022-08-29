import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import MyBookings from "./components/MyBookings/MyBookings";
import MySpots from "./components/MySpots/MySpots";
import Home from "./components/HomePage/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/myspots">
            <MySpots />
          </Route>
          <Route path="/mybookings">
            <MyBookings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;