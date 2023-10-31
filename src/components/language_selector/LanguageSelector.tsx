import { useState, type ChangeEvent } from 'react';
import { i18n, saveInLocal } from '../../helpers';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.

  const chooseLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    void i18n.changeLanguage(e.target.value)
    setSelectedLanguage(e.target.value)
    saveInLocal('lng', e.target.value)
  }

  return (
      <select defaultValue={selectedLanguage} onChange={chooseLanguage} >
          <option value="es">English</option>
          <option value="en">Español</option>
          {/* <option value="it">Italian</option> */}
      </select>
  );
};

export default LanguageSelector
