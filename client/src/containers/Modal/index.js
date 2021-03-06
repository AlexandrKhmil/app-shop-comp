import React, { createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.css';

const Modal = ({ 
    isOpen, 
    title, 
    children, 
    close, 
    className, 
    classNameContent = '',
    classNameBody = '', 
    Footer,
  }) => {
  const ref = createRef();
  const backdropClose = (e) => e.target === ref.current && close();
  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div
        className={styles.modalBackdrop}
        ref={ref}
        onClick={backdropClose}
      >
        <div className={`modal-dialog ${className}`}>
          <div className={`modal-content ${classNameContent}`}>
            <div className="modal-header">
              {title &&
                <h5 className="modal-title">{title}</h5>
              }
              <button 
                onClick={close}
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={`modal-body ${classNameBody}`}>
              {children}
            </div>
            {Footer && 
              <div className="card-footer"> 
                <Footer />
              </div>
            }
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;