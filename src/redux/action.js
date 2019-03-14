export const type = {
  bodyClientWidth: 'bodyClientWidth'
};

export const creator = (type, value = undefined) => {
  return {
    type,
    value
  };
};
