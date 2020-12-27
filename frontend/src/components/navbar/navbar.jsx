import React from "react";
import { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import { NavDesktop } from "./navDesktop";
import { Sidenav } from "./sidenav";

class Navbar extends Component {
  componentDidMount() {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }

  render() {
    return (
      <div>
        <nav>
          <a
            href="#"
            data-target="slide-out"
            className="sidenav-trigger  hide-on-medium-and-up"
          >
            <i className="material-icons ">menu</i>
          </a>
          <NavDesktop />
        </nav>
        <Sidenav />
      </div>
    );
  }
}

export default Navbar;
