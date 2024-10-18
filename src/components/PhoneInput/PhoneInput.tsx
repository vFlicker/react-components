import 'react-phone-number-input/style.css';
import './reset.css';

import Input, { Country } from 'react-phone-number-input';

import { CountrySelectWithIcon } from './CountrySelectWithIcon/CountrySelectWithIcon';
import classes from './PhoneInput.module.css';

type PhoneInputProps = {
  name: string;
  label: string;
  value: string;
  error?: string;
  defaultCountry?: Country;

  onChange: (value?: string) => void;
};

export function PhoneInput({
  defaultCountry,
  name,
  value,
  label,
  error,

  onChange,
}: PhoneInputProps): JSX.Element {
  let className = '';
  if (error) className += classes.fieldInputError;

  return (
    <div className={classes.field}>
      <Input
        id={`${name}-input`}
        className={className}
        placeholder="Enter phone number"
        defaultCountry={defaultCountry}
        countrySelectComponent={CountrySelectWithIcon}
        value={value}
        onChange={onChange}
      />

      <label htmlFor={`${name}-input`} className={classes.fieldLabel}>
        {label}
      </label>

      <div id={`${name}_input-error`} className={classes.fieldError}>
        {error}
      </div>
    </div>
  );
}
