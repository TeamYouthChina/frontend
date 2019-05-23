export const addTimeOffset = (date) => {
  return(new Date(date.getTime()+date.getTimezoneOffset() * 60000));
  // return(date)
};

