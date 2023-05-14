import axios from "axios";
import constants from "../../constants";

/**
 * ! SET DEFAULTS
 */
function setAxios() {
  axios.defaults.baseURL = constants.API_URL;
  axios.defaults.headers.post["Content-Type"] = constants.CONTENT_TYPE;
  
  if (constants.TOKEN) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + constants.TOKEN;
  }
}

/**
 * ! POST DATA
 * @param {string} url 
 * @param {array} data 
 * @returns 
 */
export async function postData(url, data) {
  setAxios();
  const response = await axios.post(url, data);

  return response.data;
}

/**
 * ! GET DATA
 * @param {string} url 
 * @returns 
 */
export async function getData(url) {
  setAxios();
  const response = await axios.get(url);

  return response.data;
}

/**
 * ! PUT DATA
 * @param {string} url 
 * @param {array} data 
 * @returns 
 */
export async function putData(url, data) {
  setAxios();
  const response = await axios.put(url, data);

  return response.data;
}

/**
 * ! DELETE DATA
 * @param {string} url 
 * @returns 
 */
export async function deleteData(url) {
  setAxios();
  const response = await axios.delete(url);

  return response.data;
}
