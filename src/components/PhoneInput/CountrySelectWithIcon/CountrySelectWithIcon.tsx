import { ElementType, useState } from 'react';
import { Country, getCountryCallingCode } from 'react-phone-number-input';

import { country, countryCodes } from './config';
import classes from './CountrySelectWithIcon.module.css';
import { getSelectedOption, Option } from './utils';

type CountrySelectWithIconProps = {
  value: string;
  options: Option[];
  iconComponent: ElementType;

  onChange: (value: string) => void;
};

export function CountrySelectWithIcon({
  value,
  options,
  iconComponent: Icon,

  onChange,
}: CountrySelectWithIconProps): JSX.Element {
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);

  let buttonClassName = classes.inputSelectDropDown;
  if (isCountryListOpen) buttonClassName += ` ${classes.inputSelectDropDownUp}`;

  let itemClassName = classes.item;
  if (isCountryListOpen) itemClassName += ` ${classes.itemActive}`;

  const selectedOption = getSelectedOption(options, value);

  const toggleCountryList = () => {
    setIsCountryListOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={classes.inputSelectContainer}>
      <button
        className={buttonClassName}
        type="button"
        onClick={toggleCountryList}
      >
        <Icon country={value} label={selectedOption && selectedOption.label} />
      </button>

      {isCountryListOpen && (
        <ul className={classes.list}>
          {countryCodes.map((code) => (
            <li
              className={itemClassName}
              key={code}
              data-country-code={code}
              onClick={(evt) => {
                onChange(evt.currentTarget.dataset.countryCode as Country);
                toggleCountryList();
              }}
            >
              <img
                className={classes.itemImage}
                alt={value}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
              />
              <div className={classes.itemText}>
                <span>{country[code]}</span> +{getCountryCallingCode(code)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
