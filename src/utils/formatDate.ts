export const formatDate = (date: any) => {
  let d = new Date(date);
  let ye = new Intl.DateTimeFormat("de", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("de", { month: "numeric" }).format(d);
  let da = new Intl.DateTimeFormat("de", { day: "2-digit" }).format(d);
  return `${da}.${mo}.${ye}`;
};

export const checkIsDate = (date: any) => {
  const parsedDate = Date.parse(date);

  if (isNaN(date) && !isNaN(parsedDate)) {
    return true;
  }
  return false;
};
