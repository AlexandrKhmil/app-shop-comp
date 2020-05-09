import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reviewAdd } from '../../actions/review';

const ReviewForm = ({ token, link, reviewAdd }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    reviewAdd({ token, link, title, text });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Заголовок</label>
        <input 
          className="form-control"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={false} /> 
      </div>
      <div className="form-group">
        <label htmlFor="text">Текст</label>
        <textarea  
          className="form-control"
          type="textarea" 
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={false} /> 
      </div>
      <div className="form-group d-flex justify-content-end mb-0">
        <button 
          className="btn btn-primary d-flex 
            justify-content-between align-items-center"
          disabled={false} >
          {false && 
            <span 
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            >
            </span>
          }
          {!false ? 'Enter' : 'Loading'}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  link: state.selected.data.link,
  token: state.account.token,
});

const mapDispatchToProps = (dispatch) => ({
  reviewAdd: (value) => dispatch(reviewAdd(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
