import React, { useState } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/account';
import { messageShow } from '../../actions/message';
import * as msgType from '../../constants/message-type';

const Login = ({ isLoading, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const allFilled = Boolean(email && password);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!allFilled) {
      return messageShow({ type: msgType.MESSAGE_ERROR, text: 'Заполните все поля!' });
    }
    loginUser({ email, password });
  }

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
  loginUser: (value) => dispatch(loginUser(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
