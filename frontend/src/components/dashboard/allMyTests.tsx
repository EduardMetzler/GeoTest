import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { myTestsId } from "../../store/auth/auth.model";
import { AppState } from "../../store/model";

interface ConnectedState {
  myTestsListe: myTestsId[];
}

const mapStateToProps = (state: AppState) => ({
  myTestsListe: state.auth.myTestsListe,
});

export const AllMyTestsComponent: React.FC<ConnectedState> = ({
  myTestsListe,
}) => {
  return (
    <table className="highlight">
      <tbody>
        {myTestsListe.map((test: any, i: any) => (
          <tr key={i}>
            <td>
              <Link to={`/one-test/${test.id}`}>
                <h5>{test.name}</h5>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AllMyTests = connect(mapStateToProps)(AllMyTestsComponent);
