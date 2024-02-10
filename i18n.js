import intl from 'react-intl-universal';

const locales = {
  "en-US": require('.en.json'),
  "ru-RU": require('.ua.json'),
};

intl.init({
  currentLocale: 'en-US', // TODO: determine your current locale here
  locales,
});