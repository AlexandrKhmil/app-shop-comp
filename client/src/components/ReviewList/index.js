import React from 'react';
import { connect } from 'react-redux';
import { dateTimeFormat, dateToInteger } from '../../functions';

const ReviewList = ({ list }) => {
  if (!list) {
    return <>Отзывы отсутствуют...</>
  }

  return (
    <>
      {list.map((review) =>
        <div className="card card-body border-primary mb-3" key={review.id}>
          <h5>{review.title}</h5>
          <small>
            {review.email} в {dateTimeFormat(review.create_time)} 
            {review.create_time !== review.update_time 
              ? ` (Изменен ${dateTimeFormat(review.update_time)})`
              : '' 
            }
          </small>
          <p className="mb-0">{review.text}</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const reviewList = state.selected.data.review_list;
  let list = reviewList ? Object.values(reviewList) : [];
  list = list.sort((a, b) => { 
    return dateToInteger(b.update_time) - dateToInteger(a.update_time)
  });
  
  return {
    list,
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
