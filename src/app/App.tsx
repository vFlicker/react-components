import './App.css';

import { useState } from 'react';

import { DialogModal, TransitionModal } from '../components/Modal';
import { PhoneInput } from '../components/PhoneInput';

export function App(): JSX.Element {
  const [phoneValue, setPhoneValue] = useState<string | undefined>('');
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);

  const error = phoneValue === '+380980000001' ? 'Error text...' : '';

  return (
    <>
      <PhoneInput
        defaultCountry="UA"
        name="phone"
        label="Phone Number"
        value={phoneValue}
        error={error}
        onChange={setPhoneValue}
      />

      <div className="modal">
        <button onClick={() => setShowTransitionModal(true)}>
          Click to Open Modal
        </button>

        <TransitionModal
          isOpen={showTransitionModal}
          onClose={() => setShowTransitionModal(false)}
        >
          This is Modal Content!
        </TransitionModal>
      </div>

      <div className="modal">
        <button onClick={() => setShowDialogModal(true)}>
          Click to Open Modal
        </button>

        <DialogModal
          isOpen={showDialogModal}
          onClose={() => setShowDialogModal(false)}
        >
          This is Modal Content!
        </DialogModal>
      </div>
    </>
  );
}
