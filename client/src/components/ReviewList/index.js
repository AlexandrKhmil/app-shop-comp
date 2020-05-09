import React from 'react';
import { connect } from 'react-redux';
import { dateTimeFormat } from '../../functions';

const ReviewList = ({ list }) => {
  if (!list) {
    return <>Отзывы отсутствуют...</>
  }

  return (
    <>
      {list.map((review) =>
        <div className="card card-body border-primary mb-3" key={review.id}>
          <h5>{review.title}</h5>
          <small>{review.email} в {dateTimeFormat(review.create_time)}</small>
          <p className="mb-0">{review.text}</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const list = state.selected.data.review_list ? Object.values(state.selected.data.review_list) : []
  return {
    list,
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
