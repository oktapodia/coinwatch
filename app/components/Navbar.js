// @flow
import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import image from "../appIconLarge.png";

class Navbar extends Component {
  onClickUpdateAvailable() {
    ipcRenderer.send('check-update', true);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="top-container">
          <div className="title">
            <h1><Link to="/"><img src={image} width={50} /> Coin Watch</Link></h1>
          </div>
          <div className="content">
          </div>
          <div className="toolbar pull-right">
            <a onClick={this.onClickUpdateAvailable} className="link-update"><span className="glyphicon glyphicon-download-alt" aria-hidden="true" /></a>
            <Link to="/settings" className="link-settings"><span className="glyphicon glyphicon-cog" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="tabs">
          <NavLink to="/coins" className="tab">Home</NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;
