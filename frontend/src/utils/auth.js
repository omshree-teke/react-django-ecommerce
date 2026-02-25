export const saveToken = (token) => {
    localStorage.setItem("access_token", token.access);   // comma was inside string
    localStorage.setItem("refresh_token", token.refresh); // comma was inside string
};

export const clearTokens = () => {
    localStorage.removeItem("access_token");  // was getItem instead of removeItem
    localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token"); // this was inside clearTokens!
};

export const authFetch = (url, options = {}) => {
  const token = getAccessToken();
  const headers = options.headers ? { ...options.headers } : {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";

  return fetch(url, {
    ...options,
    headers,
  });
};