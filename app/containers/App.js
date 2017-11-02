import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'; // TODO: Move css to scss files
import React from 'react';
import Tray from '../modules/tray';
import Navbar from '../components/Navbar';
import '../styles/index.scss';

const App = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <div className="main-container">
      {children}
    </div>
    <Tray />
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
