import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reviewAdd } from '../../actions/review';
import { modalLoginOpen } from '../../actions/modal';

const ReviewForm = ({ isAuth, token, link, reviewAdd, modalLoginOpen, userReview }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const buttonText = !false ? 'Send Review' : 'Loading';

  const onSubmit = (e) => {
    e.preventDefault();
    reviewAdd({ token, link, title, text });
  };
  
  useEffect(() => {
    if (userReview) {
      setTitle(userReview.title);
      setText(userReview.text);
    } 
  }, [userReview])

  if (!isAuth) {
    return (
      <div className="d-flex align-items-center">
        Для того чтобы оставить отзыв 
        <button 
          className="btn btn-link p-0 ml-1" 
          onClick={modalLoginOpen}>
            войдите в систему
        </button>.
      </div>
    );
  }

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
          className="btn btn-primary d-flex justify-content-between align-items-center"
          disabled={false}>
          {false && 
            <span 
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true">
            </span>
          }
          {buttonText}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const userReview = state.selected.data.review_list && state.selected.data.review_list.find((review) => {
    return review.email === state.account.email;
  });
  return {
    isAuth: state.account.token,
    link: state.selected.data.link,
    token: state.account.token,
    userReview, 
  }; 
};

const mapDispatchToProps = (dispatch) => ({
  reviewAdd: (value) => dispatch(reviewAdd(value)),
  modalLoginOpen: () => dispatch(modalLoginOpen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
