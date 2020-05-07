import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { modalLoginOpen } from '../../actions/modal';

const Header = (
  { 
    isAuth,
    modalLoginOpen,
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
          className="nav-link btn btn-link">
          Register
        </button>
      </li>
    </>
  );
  
  const authLinks = (
    <>
      <li className="nav-item">
        <p className="text-light mb-0 mr-3">Welcome user!</p>
      </li>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link">
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">Brand</NavLink>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto align-items-center">
            {!isAuth ? unauthLinks : authLinks}
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  modalLoginOpen: () => dispatch(modalLoginOpen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);