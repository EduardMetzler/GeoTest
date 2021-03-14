import React from "react";
import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoading, logoutSuccess } from "../../store/auth/auth.actions";
import { clearErrors } from "../../store/error/error.actions";

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

export const NavDesktopComponent: React.FC<ConnectedState> = ({
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
      <Link className="brand-logo left hide-on-med-and-down" to="/">
        GeoTest{" "}
      </Link>{" "}
      <ul className="right hide-on-med-and-down ">
        <li>
          {!isAuthenticated ? (
            <Link to="login">Anmelden </Link>
          ) : (
            <div style={{}}>
              <Link onClick={() => dispatch(clearErrors())} to="/dashboard">
                {" "}
                Hallo {firstName} !{" "}
              </Link>
            </div>
          )}
        </li>
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
      </ul>
    </>
  );
};

export const NavDesktop = connect(mapStateToProps)(NavDesktopComponent);
