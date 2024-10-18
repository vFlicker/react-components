import { PropsWithChildren, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactPortal } from '../ReactPortal';
import classes from './styles.module.css';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const enum EscKeyEvent {
  Escape = 'Escape',
  Esc = 'Esc',
}

export function TransitionModal({
  children,
  isOpen,
  onClose,
}: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <ReactPortal wrapperId="transition-modal-container">
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
