export const MOBILE = 1;
export const DESKTOP = 2;

export const getType = (bodyClientWidth) => {
  if (typeof (bodyClientWidth) !== 'number') {
    bodyClientWidth = document.body.clientWidth;
  }
  if (bodyClientWidth < 480) {
    return MOBILE;
  } else {
    return DESKTOP;
  }
};
