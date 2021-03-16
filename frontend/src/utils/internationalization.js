import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import en from '../locales/en.json';

import { setLocale } from '../store/actions/userPreferences';
import * as config from '../config';

/* Safari 12- and IE */
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill-locales');
}
/* Safari 13- and IE */
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill-locales');
}

const translatedMessages = {
  // ar: ar,
  // cs: cs,
  // de: de,
  // el: el,
  en: en,
  // es: es,
  // 'fa-IR': fa_IR,
  // fr: fr,
  // he: he,
  // hu: hu,
  // id: id,
  // it: it,
  // ja: ja,
  // mg: mg,
  // ml: ml,
  // nl: nl_NL,
  // pt: pt,
  // 'pt-BR': pt_BR,
  // ru: ru,
  // sv: sv,
  // sw: sw,
  // tl: tl,
  // tr: tr,
  // uk: uk,
  // zh: zh_TW,
};

// commented values doesn't have a good amount of strings translated
const supportedLocales = [
  // { value: 'ar', label: 'عربى' },

  { value: 'en', label: 'English' },
];

function getSupportedLocale(locale) {
  if (locale) {
    let filtered = supportedLocales.filter((i) => i.value === locale);
    if (filtered.length) {
      return filtered[0];
    }
    // if we don't have the specific language variation, return the generic locale
    filtered = supportedLocales.filter((i) => i.value === locale.substr(0, 2));
    if (filtered.length) {
      return filtered[0];
    }
  }
  return { value: 'en', label: 'English' };
}

function getTranslatedMessages(locale) {
  let localeCode = getSupportedLocale(locale);
  if (localeCode.hasOwnProperty('value')) {
    return translatedMessages[localeCode.value];
  }
  return translatedMessages[locale];
}

/* textComponent is for orderBy <select>, see codesandbox at https://github.com/facebook/react/issues/15513 */
let ConnectedIntl = (props) => {
  useEffect(() => {
    if (props.locale === null) {
      props.setLocale(getSupportedLocale(navigator.language).value);
    }
  }, [props]);
  return (
    <IntlProvider
      key={props.locale || config.DEFAULT_LOCALE}
      locale={props.locale ? props.locale.substr(0, 2) : config.DEFAULT_LOCALE}
      textComponent={React.Fragment}
      messages={getTranslatedMessages(props.locale)}
    >
      {props.children}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  locale: state.preferences.locale,
});

ConnectedIntl = connect(mapStateToProps, { setLocale })(ConnectedIntl);

export { ConnectedIntl, supportedLocales, getSupportedLocale, getTranslatedMessages };
