import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registrationUser } from '../../actions/account';
import { messageShow } from '../../actions/message';
import * as msgType from '../../constants/message-type';

const Registration = ({ isLoading, registrationUser, messageShow }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const passwordIsMatch = password === passwordRepeat;
  const allFilled = Boolean(email && password && passwordRepeat);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!allFilled) {
      return messageShow({ type: msgType.MESSAGE_ERROR, text: 'Заполните все поля!' });
    }
    if (!passwordIsMatch) {
      return messageShow({ type: msgType.MESSAGE_ERROR, text: 'Пароли не совпадают!' });
    }
    registrationUser({ email, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          className="form-control"
          type="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          className="form-control"
          type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading} />
      </div>
      <div className="form-group">
        <label htmlFor="passwordRepeat">Repeat Password</label>
        <input 
          className={`form-control ${!passwordIsMatch ? 'is-invalid' : ''}`}
          type="password" 
          name="passwordRepeat"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          disabled={isLoading} />
          <div className="invalid-feedback">Пароли не совпадают!</div>
      </div>
      <div className="form-group d-flex justify-content-end mb-0">
          <button 
            className="btn btn-primary d-flex 
              justify-content-between align-items-center"
            disabled={isLoading} >
            {isLoading && 
              <span 
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              >
              </span>
            }
            {!isLoading ? 'Enter' : 'Loading'}
          </button>
        </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.account.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  registrationUser: (value) => dispatch(registrationUser(value)),
  messageShow: (value) => dispatch(messageShow(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
