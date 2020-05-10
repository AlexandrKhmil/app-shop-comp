import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import * as msgType from '../../constants/message-type';

const Alert = ({ message, alert }) => {
  useEffect(() => {
    if (!message.type) return;
    if (message.type === msgType.MESSAGE_ERROR) alert.error(message);
    if (message.type === msgType.MESSAGE_SUCCESS) alert.success(message);
  }, [message, alert]);
  return <></>;
};

const mapStateToProps = (state) => ({
  message: state.message,
  type: state.message.type,
  title: state.message.title,
  text: state.message.text,
});

export default connect(mapStateToProps)(withAlert()(Alert));