import React from 'react';
import styles from './styles.module.css';
import * as msgType from '../../constants/message-type';

const AlertTemplate = ({ style, message, close }) => {
  const color = msgType.MESSAGE_SUCCESS === message.type 
    ? 'alert-success'
    : 'alert-warning';
  return (
    <div className={`alert alert-dismissible ${color}`} style={style}>
      <h4 className={`alert-heading ${styles.head}`}>
        {message.title || 'Ошибка!'}
      </h4>
      <p className="mb-0">{message.text || ''}</p>
      <button type="button" className="close" onClick={close}>&times;</button>
    </div>
  );
};

export default AlertTemplate;
