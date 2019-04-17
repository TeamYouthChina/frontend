import Cookies from 'js-cookie';

export const languageHelper = () => {
  switch (Cookies.get('language')) {
    case 'en_US':
      return 1;
    default: // 'zh_CN'
      return 0;
  }
};
