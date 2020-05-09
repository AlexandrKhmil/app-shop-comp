import React from 'react';
import { connect } from 'react-redux';

const ReviewList = ({ list }) => {
  if (!list) {
    return <>Отзывы отсутствуют...</>
  }

  return (
    <div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.selected.review_list 
    ? Object.values(state.selected.review_list)
    : null,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
