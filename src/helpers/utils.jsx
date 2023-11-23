export const displayMoney = (n) => {
  const format = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "try",
  });

  return format.format(n);
};

export const displayFullDate = (dateString) => {
  var dateObject = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return Intl.DateTimeFormat("tr-TR", options).format(dateObject);
};

export const displayDate = (dateString) => {
  var dateObject = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return Intl.DateTimeFormat("tr-TR", options).format(dateObject);
};
