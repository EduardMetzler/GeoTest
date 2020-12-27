import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import Navbar from "./components/navbar/navbar";
// import { ErrorComponent } from "./components/error";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        {/* <ErrorComponent /> */}
        <Navbar />
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2 xl8 offset-xl2">
            <Routes />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

// import React, { useState } from "react";
// import { connect, Provider, useDispatch } from "react-redux";
// // import { Link, Router } from "react-router-dom";
// import { ErrorComponent } from "./components/error";

// import { AppState } from "../src/store/model";
// import Navbar from "./components/navbar/navbar";
// import { configureStore } from "./store/store";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Routes } from "./routes";

// interface ConnectedState {
//   error: String;
// }

// const mapStateToProps = (state: AppState) => ({
//   error: state.error.message,
// });

// export const AppComponent: React.FunctionComponent<ConnectedState> = ({
//   error,
// }) => {
//   return (
//     <Provider store={configureStore()}>
//       <Router>
//         <ErrorComponent />
//         <Navbar />
//         <div className="row">
//           <div className="col s12 m10 offset-m1 l8 offset-l2 xl8 offset-xl2">
//             <Routes />
//           </div>
//         </div>
//       </Router>
//     </Provider>
//   );
// };
// // export default  AppComponent = connect(mapStateToProps)(AppComponent);

// export const App = connect(mapStateToProps)(AppComponent);
