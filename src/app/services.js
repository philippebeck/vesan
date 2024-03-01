import axios from "axios";

// ! ******************** CHECKERS ********************

/**
 * ? CHECK RANGE
 * * Checks whether a given value is within a specified range of min & max values,
 * * either by comparing their string length or their numerical value
 * @param {number | string} value - The value to check against the range
 * @param {string} message - The message to display if the value is not within range
 * @param {number} [min=2] - The minimum value of range
 * @param {number} [max=200] - The maximum value of range
 * @return {boolean} Returns true if the value is within the specified range, otherwise false
 */
export const checkRange = (value, message, min = 2, max = 250) => {
  const NUMBER = typeof value === "number" && value >= min && value <= max;
  const STRING = typeof value === "string" && value.length >= min && value.length <= max;

  const IN_RANGE = NUMBER || STRING;
  if (!IN_RANGE) alert(`${message} ${min} & ${max}`);

  return IN_RANGE;
};

/**
 * ? CHECK REGEX
 * * Checks if a given value matches a regular expression
 * * If it does not, it displays an alert message & returns false
 * @param {any} value - The value to be tested against the regular expression
 * @param {string} message - The message to be displayed in case the value does not match the regex
 * @param {RegExp} regex - The regular expression to test the value against
 * @returns {boolean} - Returns true if the value matches the regex, false otherwise
 */
export const checkRegex = (value, message, regex) => {
  if (regex.test(value)) return true;

  alert(message);
  return false;
};

/**
 * ? CHECK ROLE
 * * Checks if a given user role has the required role permission
 * @param {string} userRole - The role of the user being checked
 * @param {string} role - The required role permission
 * @returns {boolean} Returns true if the user has the required role permission, else false
 */
export const checkRole = (userRole, role) => {
  return userRole === "admin" ? true
    : userRole === "editor" ? role !== "admin"
      : userRole === "user" ? role === "user"
        : false;
};

// ! ******************** FETCHERS ********************

/**
 * ? SET AXIOS
 * * Sets Axios default headers with an optional token and an optional content-type
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 */
export const setAxios = (token = null, type = "multipart/form-data") => {
  axios.defaults.headers.post["Content-Type"] = type;

  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

/**
 * ? POST DATA
 * * Sends a POST request to the specified URL
 * * with the provided data, an optional token & an optional content-type
 * @param {string} url - The URL to send the POST request to
 * @param {object} data - The data to send in the request body
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const postData = async (url, data, token = null, type = "multipart/form-data") => {
  setAxios(token, type);
  const response = await axios.post(url, data);

  return response?.data;
};

/**
 * ? GET DATA
 * * Fetch data from the specified URL
 * @param {string} url - The URL to fetch data from
 * @param {string | null} token - The authentication token (optional)
 * @param {string} type - The content type (default: "multipart/form-data")
 * @returns {Promise<any>} The data fetched from the URL
 */
export const getData = async (url, token = null, type = "multipart/form-data") => {
  setAxios(token, type);
  const response = await axios.get(url);

  return response?.data;
};

/**
 * ? PUT DATA
 * * Sends a PUT request to the specified URL
 * * with the provided data, an optional token & an optional content-type
 * @param {string} url - The URL to send the PUT request to
 * @param {object} data - The data to send in the request body
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const putData = async (url, data, token = null, type = "multipart/form-data") => {
  setAxios(token, type);
  const response = await axios.put(url, data);

  return response?.data;
};

/**
 * ? DELETE DATA
 * * Sends a DELETE request to the specified URL
 * * with an optional token & an optional content-type
 * @param {string} url - The URL to send the DELETE request to
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const deleteData = async (url, token = null, type = "multipart/form-data") => {
  setAxios(token, type);
  const response = await axios.delete(url);

  return response?.data;
};
// ! ******************** GETTERS ********************

/**
 * ? GET CATEGORIES
 * * Returns an array of unique categories from the given items
 * @param {Array<{ cat: string }>} items - An array of objects representing items with a 'cat' property
 * @return {Array<string>} An array of unique cat categories from the given items
 */
export const getCats = (items) => [...new Set(items.map(item => item.cat))];

/**
 * ? GET ITEM NAME
 * * Returns the name of the item with the given id from the provided array of items
 * @param {string} id - The id of the item to search for
 * @param {Array<{id: string, name: string}>} items - An array of items to search through
 * @return {string|false} The name of the item with the given id if found, false otherwise
 */
export const getItemName = (id, items) => {
  const item = items.find(item => item.id === id);

  return item ? item.name : false;
};

/**
 * ? GET ITEMS BY CATEGORY
 * * Groups an array of items by category & sorts each category's item list by id or name
 * @param {Array} items - The array of items to group
 * @param {string} [sortBy="id"] - The property to sort the items by
 * @return {Object} An object where each key is a category & its value is the array of items belonging to that category
 */
export const getItemsByCat = (items, sortBy = "id") => {
  const itemsByCat = {};

  for (const item of items) {
    const cat = item.cat;
    itemsByCat[cat] = itemsByCat[cat] ?? [];

    itemsByCat[cat].push(item);
  }

  for (const cat in itemsByCat) {
    itemsByCat[cat].sort((a, b) => sortBy === "id"
      ? Number(a.id) - Number(b.id)
      : a.name.localeCompare(b.name));
  }

  return itemsByCat;
};

// ! ******************** SETTERS ********************

/**
 * ? SET ERROR
 * * Logs an error message from the provided error object
 * @param {Error} error - The error object to log the message from
 */
export const setError = (error) => {
  const { name, message } = error;

  alert(name && message ? name + ": " + message : message);
};

/**
 * ? SET GLOBAL META
 * * Sets the metadata of the website including language & favicon
 * @param {string} [lang="en"] - The language code to set in the metadata
 * @param {string} [icon="img/favicon.ico"] - The path to the favicon to set in the metadata
 */
export const setGlobalMeta = (lang = "en", icon = "img/favicon.ico") => {
  const iconElt = document.querySelector('[rel="icon"]');

  document.documentElement.lang = lang;

  if (iconElt) iconElt.href = icon;
};

/**
 * ? SET META
 * * Sets the metadata of the page including title, description, url & image
 * @param {string} title - the title to set
 * @param {string} description - The description to set
 * @param {string} url - The URL to set
 * @param {string|null} [image] - The image to set
 */
export const setMeta = (title, description, url, image = null) => {
  const canonicalTag = document.querySelector('[rel="canonical"]');

  const titleTag = document.querySelector("title");
  const ogTitleTag = document.querySelector('[property="og:title"]');
  const descriptionTag = document.querySelector('[name="description"]');
  const ogDescriptionTag = document.querySelector('[property="og:description"]');
  const ogUrlTag = document.querySelector('[property="og:url"]');
  const ogImageTag = image ? document.querySelector('[property="og:image"]') : null;

  if (canonicalTag) canonicalTag.href = url;
  if (titleTag) titleTag.innerText = title;

  if (ogTitleTag) ogTitleTag.setAttribute("content", title);
  if (descriptionTag) descriptionTag.setAttribute("content", description);
  if (ogDescriptionTag) ogDescriptionTag.setAttribute("content", description);
  if (ogUrlTag) ogUrlTag.setAttribute("content", url);
  if (image && ogImageTag) ogImageTag.setAttribute("content", image);
};
