import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

const Alert = ({ message, alert }) => {
  useEffect(() => {
    if (message.text) alert.error(message);
  }, [message, alert]);
  return <></>;
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alert));