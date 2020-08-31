import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/model";
// import { authRegister } from "../../store/user/user.actions";
import "./register.css";
import { register } from "../../store/auth/auth.actions";

interface OwnProps {}

interface ConnectedState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const RegisterComponent: React.FunctionComponent<ConnectedState & OwnProps> = ({
  isAuthenticated,
  isLoading,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    dispatch(register(firstName, lastName, email, password, password2));

    event.preventDefault();
  };

  const checkData = () => {
    if (
      firstName.length < 1 ||
      firstName.length < 1 ||
      email.length < 1 ||
      password.length < 6 ||
      password !== password2 ||
      isLoading
    ) {
      return "btn disabled";
    }
    return "btn";
  };

  return (
    <div className="row register-container">
      <div className="col m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
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
              <label>
                Repeat Password:
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </label>
              <input
                type="submit"
                value="Registrieren"
                className={checkData()}
              />
              <Link to="/login">
                <span className="login-link">Anmelden</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Register = connect(mapStateToProps)(RegisterComponent);
