import { PropsWithChildren, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { EscKeyEvent } from './config';
import { ReactPortal } from './ReactPortal';
import classes from './styles.module.css';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function Modal({
  children,
  isOpen,
  onClose,
}: ModalProps): JSX.Element | null {
  const modalRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (evt: KeyboardEvent) => {
      if (evt.key === EscKeyEvent.Escape || evt.key === EscKeyEvent.Esc) {
        onClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ exit: 300 }}
        unmountOnExit
        classNames={{
          enterDone: classes.modalEnterDone,
          exit: classes.modalExit,
        }}
        nodeRef={modalRef}
      >
        <div className={classes.modal} ref={modalRef}>
          <div className={classes.modalInner}>
            <button onClick={onClose} className={classes.modalBtn}>
              Close
            </button>
            <div className={classes.modalContent}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
