export const BASE_API_URL = "http://localhost:5000";

export const findLink = (html, company_url) => {
  let links = html.match(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
  );
  if (links != null) {
    return links[0];
  } else {
    return company_url;
  }
};
