import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import image from '../appIconLarge.png';

class Navbar extends Component {
  static onClickUpdateAvailable() {
    ipcRenderer.send('check-update', true);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
          <div className="title">
            <h1><Link to="/"><img src={image} width={50} alt="Coin Watch"/> Coin Watch</Link></h1>
          </div>
          <div className="toolbar">
            <button onClick={this.constructor.onClickUpdateAvailable} className="link-update">
              <span className="glyphicon glyphicon-download-alt" aria-hidden="true" />
            </button>
            <Link to="/settings" className="link-settings">
                <span className="glyphicon glyphicon-cog" aria-hidden="true" />
            </Link>
          </div>
        {/*
        <div className="tabs">
          <NavLink to="/coins" className="tab">Home</NavLink>
        </div>
        */}
      </nav>
    );
  }
}

export default Navbar;
