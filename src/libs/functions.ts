import config from "../constants/config";

export const createQrUrl = (url: string, type: string) => {

  return config.createUrlPrefix + url + `&type=${type}`;
};

export const textCapitalize = (text: string) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
};

export const dateToFormat = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;

  const formattedDate = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amOrPm} ${month}/${day}/${year}`;

  return formattedDate;
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};
