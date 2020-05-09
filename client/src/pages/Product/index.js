import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectedGet } from '../../actions/selected';

const Product = ({ props, isLoading, isLoaded, selectedGet}) => {
  console.log(props)
  useEffect(() => {
    const link = props.match.params.link;
    console.log(link)
    if (!isLoading && !isLoaded) selectedGet({ link });
  }, [ isLoading, isLoaded, selectedGet]);
  return (
    <div>
      this is product
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  props: props,
  isLoading: state.selected.isLoading,
  isLoaded: state.selected.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  selectedGet: (value) => dispatch(selectedGet(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
