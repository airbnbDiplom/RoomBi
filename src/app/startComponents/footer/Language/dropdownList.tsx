'use client'
import { Dropdown } from 'react-bootstrap';
import intl from 'react-intl-universal';
import { useState, useEffect } from 'react'

const locales = {
  "English (EN)": require('./en.json'),
  "Українська (UA)": require('./ua.json'),
};

const LanguageDropdown = () => {
  const [currentLocale, setCurrentLocale] = useState('Українська (UA)');

  useEffect(() => {
    intl.init({
      currentLocale,
      locales,
    });
  }, [currentLocale]);

  const changeLanguage = (language: string) => {
    setCurrentLocale(language === 'en' ? 'English (EN)' : 'Українська (UA)');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {currentLocale}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('en')}>English (EN)</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('ua')}>Українська (UA)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;