import './App.css';

import { useState } from 'react';

import { Modal } from '../components/Modal';
import { PhoneInput } from '../components/PhoneInput';

export function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(
    '+380980000000',
  );

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

      <div className="app-header">
        <button onClick={() => setShowModal(true)}>Click to Open Modal</button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          This is Modal Content!
        </Modal>
      </div>
    </>
  );
}
