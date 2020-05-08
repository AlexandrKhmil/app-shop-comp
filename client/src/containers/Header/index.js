import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
  modalLoginOpen, 
  modalRegOpen, 
  modalCartOpen 
} from '../../actions/modal';
import { logoutUser } from '../../actions/account';

const Header = (
  { 
    isAuth,
    email,
    logoutUser,
    modalLoginOpen,
    modalRegOpen,
    modalCartOpen,
  }) => {

  const unauthLinks = (
    <>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={modalLoginOpen}>
          Login
        </button>
      </li>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={modalRegOpen}>
          Register
        </button>
      </li>
    </>
  );
  
  const authLinks = (
    <>
      <li className="nav-item">
        <p className="text-light mb-0 mr-3">Welcome {email}!</p>
      </li>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={logoutUser}>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header className="pt-4 pb-5">
      <nav className="navbar navbar-expand navbar-dark bg-primary fixed-top">
        <NavLink className="navbar-brand" to="/">Brand</NavLink>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto align-items-center">
            {!isAuth ? unauthLinks : authLinks}
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link"
                onClick={modalCartOpen}>
                Cart
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
  email: state.account.email,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  modalLoginOpen: () => dispatch(modalLoginOpen()),
  modalRegOpen: () => dispatch(modalRegOpen()),
  modalCartOpen: () => dispatch(modalCartOpen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);