import React from 'react';
import Tray from '../modules/tray';
import Navbar from '../components/Navbar';
import Modal from '../modules/modal/containers/Modal';

const App = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Tray />
    <Modal />
  </>
);

export default App;
