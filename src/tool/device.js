export const MOBILE = 1;
export const MOBILE_PAD = 2;
export const DESKTOP_720P = 3;
export const DESKTOP_1080P = 4;
export const DESKTOP_2K = 5;

export const getType = (bodyClientWidth) => {
  if (typeof (bodyClientWidth) !== 'number') {
    bodyClientWidth = document.body.clientWidth;
  }
  if (bodyClientWidth < 480) {
    return MOBILE;
  } else if (bodyClientWidth < 992) {
    return MOBILE_PAD;
  } else if (bodyClientWidth < 1488) {
    return DESKTOP_720P;
  } else if (bodyClientWidth < 1984) {
    return DESKTOP_1080P;
  } else {
    return DESKTOP_2K;
  }
};
