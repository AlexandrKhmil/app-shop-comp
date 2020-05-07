import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './containers/Header';
import Home from './pages/Home';
import Modal from './containers/Modal';
import Login from './components/Login';
import { modalLoginClose } from './actions/modal';

const App = (
  { 
    modalLoginIsOpen, 
    modalLoginClose 
  }) => {
  return (
    <Router>
      <Header />
      <Modal isOpen={modalLoginIsOpen} close={modalLoginClose} title={'Login'}>
        <Login />
      </Modal>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  modalLoginIsOpen: state.modal.login.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  modalLoginClose: () => dispatch(modalLoginClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);