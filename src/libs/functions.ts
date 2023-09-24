import config from "../constants/config";

export const createQrUrl = (url: string, type: string) => {
  let _type;

  return config.createUrlPrefix + url + `&type=${type}`;
};

export const textCapitalize = (text: string) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
};
