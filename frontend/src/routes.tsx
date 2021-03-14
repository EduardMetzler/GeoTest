import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { AppState } from "./store/model";
import { connect } from "react-redux";

import { Home } from "./page/Home.page";
import { RegisterPage } from "./page/Register.page";
import { LoginPage } from "./page/Login.page";
import { DashboardPage } from "./page/Dashboard.page";
import { OneTestDataPage } from "./page/OneTestData.page";
import { ErrorComponent } from "./components/error";
import { OneTestPage } from "./page/OneTest.page";
import { TestStartPage } from "./page/TestSart.page";

interface ConnectedState {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export const RoutesComponent: React.FC<ConnectedState> = ({
  isAuthenticated,
}) => {
  const location = useLocation();
  // console.log(location.pathname);
  if (
    (location.pathname === "/login" || location.pathname === "/register") &&
    localStorage.getItem("token")
  ) {
    return (
      <Switch>
        <Redirect to="/" />
      </Switch>
    );
  }

  if (localStorage.getItem("token")) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>
        <Route path="/one-test-data/:oneTestDataId" exact>
          <OneTestDataPage />
        </Route>
        <Route path="/one-test/:testId" exact>
          <OneTestPage />
        </Route>
        <Route path="/testStart/:oneTestDataId" exact>
          <TestStartPage />
        </Route>

        <ErrorComponent />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>

      <Redirect to="/login" />
    </Switch>
  );
};

export const Routes = connect(mapStateToProps)(RoutesComponent);
