import React, { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "../../store/model";
import {
  loadingStatus,
  newTestDataCreate,
} from "../../store/testData/testData.actions";

import "./dashboard.css";

interface ConnectedState {
  error: String;
  loading: boolean;
}

const mapStateToProps = (state: AppState) => ({
  error: state.error.message,
  loading: state.testData.loading,
});

const NewTestDataCreateComponent: React.FC<ConnectedState> = ({
  error,
  loading,
}) => {
  const [newTestDataName, setNewTestDataName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    dispatch(newTestDataCreate(newTestDataName));
    event.preventDefault();
    dispatch(loadingStatus(true));
  };

  const checkData = () => {
    if (newTestDataName.length === 0 || loading) {
      return "btn waves-effect waves-light disabled";
    }
    return "btn waves-effect waves-light ";
  };
  return (
    <>
      {/* <div className="row">
        <div className="col m10 offset-m1 l8 offset-l2 xl6 offset-xl3"> */}
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                value={newTestDataName}
                onChange={(e) => setNewTestDataName(e.target.value)}
              />
            </label>

            <input
              type="submit"
              value="Neue Testdaten Erstellen"
              className={checkData()}
            />
          </form>
        </div>
      </div>
      {/* </div>
      </div> */}
      <div className="row">
        <div className="col m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
          <div className="error">
            {error === "Bereits exestirt" ? <h4>{error}</h4> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export const NewTestData = connect(mapStateToProps)(NewTestDataCreateComponent);
