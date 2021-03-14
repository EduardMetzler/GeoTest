import React from "react";
import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoading, logoutSuccess } from "../../store/auth/auth.actions";

interface ConnectedState {
  isAuthenticated: boolean;
  firstName: String;
  token?: String | null;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,

  firstName: state.auth.firstName,
  token: state.auth.token,
});

export const SidenavComponent: React.FC<ConnectedState> = ({
  isAuthenticated,
  firstName,
  token,
}) => {
  const dispatch = useDispatch();

  if (token && !isAuthenticated) {
    dispatch(userLoading(token));
  }

  return (
    <>
      <ul id="slide-out" className="sidenav">
        <li>
          {" "}
          <Link to="/home">Logo </Link>{" "}
        </li>

        <li>{!isAuthenticated ? <Link to="login">Anmelden </Link> : null}</li>

        <li>
          {isAuthenticated ? (
            <Link onClick={() => dispatch(logoutSuccess())} to="/">
              Abmelden{" "}
            </Link>
          ) : null}
        </li>
        <li>
          {!isAuthenticated ? <Link to="register">Registrieren</Link> : null}
        </li>
        <li>
          {isAuthenticated && firstName ? (
            <Link to="dashboard"> Hallo {firstName} ! </Link>
          ) : null}
        </li>
      </ul>
    </>
  );
};

export const Sidenav = connect(mapStateToProps)(SidenavComponent);
