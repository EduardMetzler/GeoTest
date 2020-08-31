import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/model";
import { login } from "../../store/auth/auth.actions";

import "./login.css";

interface OwnProps {}

interface ConnectedState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const mapStateToProps = (state: AppState) => ({
  //   state: state,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const LoginComponent: React.FunctionComponent<ConnectedState & OwnProps> = ({
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    console.log(email, password);
    dispatch(login(email, password));
    event.preventDefault();
  };

  const checkData = () => {
    if (email.length < 1 || password.length < 6 || isLoading) {
      return "btn disabled";
    }
    return "btn";
  };

  return (
    <div className="row login-container">
      <div className="col m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <label>
                E-Mail:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <input type="submit" value="Anmelden" className={checkData()} />
              <Link to="/register">
                <span className="register-link"> Registrieren</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Login = connect(mapStateToProps)(LoginComponent);
