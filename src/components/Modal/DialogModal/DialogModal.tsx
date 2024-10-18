import { PropsWithChildren, useEffect, useRef } from 'react';

import { ReactPortal } from '../ReactPortal';
import classes from './styles.module.css';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function DialogModal({
  children,
  isOpen,
  onClose,
}: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (isOpen) modalRef.current.showModal();
    else modalRef.current.close();
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="dialog-modal-container">
      <dialog className={classes.modal} ref={modalRef} onClose={onClose}>
        <button onClick={onClose} className={classes.modalBtn}>
          Close
        </button>
        <div className={classes.modalContent}>{children}</div>
      </dialog>
    </ReactPortal>
  );
}
