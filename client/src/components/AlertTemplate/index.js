import React from 'react';
import styles from './styles.module.css';

const AlertTemplate = ({ style, message, close }) => (
  <div className="alert alert-dismissible alert-warning" style={style}>
    <h4 className={`alert-heading ${styles.head}`}>
      {message.title || 'Ошибка!'}
    </h4>
    <p className="mb-0">{message.text || ''}</p>
    <button type="button" className="close" onClick={close}>&times;</button>
  </div>
)

export default AlertTemplate;