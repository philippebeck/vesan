import axios from 'axios'

// ! ******************** CHECKERS ********************

/**
 * ? CHECK RANGE
 * * Checks whether a given value is within a specified range of min & max values,
 * * either by comparing their string length or their numerical value
 *
 * @param {number|string} value - The value to check against the range
 * @param {string} message - The message to display if the value is not within range
 * @param {number} [min=2] - The minimum value of range
 * @param {number} [max=250] - The maximum value of range
 * @return {boolean} Returns true if the value is within the specified range, otherwise false
 */
export const checkRange = (value: number | string, message: string, min: number = 2, max: number = 250): boolean => {
  const NUMBER: boolean = typeof value === 'number' && value >= min && value <= max
  const STRING: boolean = typeof value === 'string' && value.length >= min && value.length <= max

  const IN_RANGE: boolean = NUMBER || STRING

  if (!IN_RANGE) alert(`${message} ${min} & ${max}`)

  return IN_RANGE
}

/**
 * ? CHECK REGEX
 * * Checks if a given value matches a regular expression
 * * If it does not, it displays an alert message & returns false
 *
 * @param {any} value - The value to be tested against the regular expression
 * @param {string} message - The message to be displayed in case the value does not match the regex
 * @param {RegExp} regex - The regular expression to test the value against
 * @returns {boolean} - Returns true if the value matches the regex, false otherwise
 */
export const checkRegex = (value: any, message: string, regex: RegExp): boolean => {
  if (regex.test(value)) return true

  alert(message)

  return false
}

/**
 * ? CHECK ROLE
 * * Checks if a given user role has the required role permission
 *
 * @param {string} userRole - The role of the user being checked
 * @param {string} role - The required role permission
 * @returns {boolean} Returns true if the user has the required role permission, else false
 */
export const checkRole = (userRole: string, role: string): boolean => {
  return userRole === 'admin'
    ? true
    : userRole === 'editor'
      ? role !== 'admin'
      : userRole === 'user'
        ? role === 'user'
        : false
}

/**
 * ? CHECK SLOT
 * * Check if the given slot name exists
 *
 * @param {Record<string, unknown>} slots - The object containing the slots
 * @param {string} name - The name of the slot to check
 * @returns {boolean} Whether the slot exists or not
 */
export const checkSlot = (slots: Record<string, unknown>, name: string): boolean => {
  return Object.prototype.hasOwnProperty.call(slots, name)
}

// ! ******************** FETCHERS ********************

/**
 * ? SET AXIOS
 * * Sets Axios default headers with an optional token and an optional content-type
 *
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @returns {void}
 */
export const setAxios = (token: string | null = null, type: string = 'multipart/form-data'): void => {
  axios.defaults.headers.post['Content-Type'] = type

  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * ? POST DATA
 * * Sends a POST request to the specified URL with the provided data, an optional token & an optional content-type
 *
 * @param {string} url - The URL to send the POST request to
 * @param {object} data - The data to send in the request body
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const postData = async (
  url: string,
  data: object,
  token: string | null = null,
  type: string = 'multipart/form-data'
): Promise<any> => {
  setAxios(token, type)

  const response = await axios.post(url, data)

  return response?.data
}

/**
 * ? GET DATA
 * * Fetch data from the specified URL
 *
 * @param {string} url - The URL to fetch data from
 * @param {string|null} token - The authentication token (optional)
 * @param {string} type - The content type (default: "multipart/form-data")
 * @returns {Promise<any>} The data fetched from the URL
 */
export const getData = async (
  url: string,
  token: string | null = null,
  type: string = 'multipart/form-data'
): Promise<any> => {
  setAxios(token, type)

  const response = await axios.get(url)

  return response?.data
}

/**
 * ? PUT DATA
 * * Sends a strongly-typed PUT request to the specified URL
 * * with the provided data, an optional token & an optional content-type
 *
 * @param {string} url - The URL to send the PUT request to
 * @param {object} data - The data to send in the request body
 * @param {string | null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const putData = async (
  url: string,
  data: object,
  token: string | null = null,
  type: string = 'multipart/form-data'
): Promise<any> => {
  setAxios(token, type)

  const response = await axios.put(url, data)

  return response?.data
}

/**
 * ? DELETE DATA
 * * Sends a DELETE request to the specified URL
 * * with an optional token & an optional content-type
 *
 * @param {string} url - The URL to send the DELETE request to
 * @param {string|null} [token=null] - An optional authentication token
 * @param {string} [type="multipart/form-data"] - An optional Content-Type
 * @return {Promise<any>} A Promise that resolves to the response data
 */
export const deleteData = async (
  url: string,
  token: string | null = null,
  type: string = 'multipart/form-data'
): Promise<any> => {
  setAxios(token, type)

  const response = await axios.delete(url)

  return response?.data
}

// ! ******************** GETTERS ********************

/**
 * ? GET CATEGORIES
 * * Returns an array of unique categories from the given items
 *
 * @param {{ cat: string }[]} items - An array of objects representing items with a 'cat' property
 * @returns {string[]} An array of unique cat categories from the given items
 */
export const getCats = (items: { cat: string }[]): string[] => {
  return [...new Set(items.map((item) => item.cat))]
}

/**
 * ? GET ITEM NAME
 * * Returns the name of the item with the given id from the provided array of items
 *
 * @param {string} id - The id of the item to search for
 * @param {{id: string, name: string}[]} items - An array of items to search through
 * @return {string|false} - The name of the item with the given id if found, false otherwise
 */
export const getItemName = (id: string, items: { id: string; name: string }[]): string | false => {
  const item = items.find((item) => item.id === id)

  return item ? item.name : false
}

/**
 * ? GET ITEMS BY CATEGORY
 * * Groups an array of items by category & sorts each category's item list by id or name
 *
 * @param {{id: string, name: string, cat: string}[]} items - The array of items to group
 * @param {string} [sortBy="id"] - The property to sort the items by
 * @return {Record<string, {id: string, name: string}[]>} An object where each key is a category & its value is the array of items belonging to that category
 */
export const getItemsByCat = (
  items: { id: string; name: string; cat: string }[],
  sortBy: string = 'id'
): Record<string, { id: string; name: string }[]> => {
  const itemsByCat: Record<string, { id: string; name: string }[]> = {}

  for (const item of items) {
    const cat: string = item.cat
    itemsByCat[cat] = itemsByCat[cat] ?? []
    itemsByCat[cat].push(item)
  }

  for (const cat in itemsByCat) {
    itemsByCat[cat].sort((a, b) => (sortBy === 'id' ? Number(a.id) - Number(b.id) : a.name.localeCompare(b.name)))
  }

  return itemsByCat
}

// ! ******************** SETTERS ********************

/**
 * ? SET ERROR
 * * Logs an error message from the provided error object
 *
 * @param {Error} error - The error object to log the message from
 * @returns {void}
 */
export const setError = (error: Error): void => {
  const { name, message } = error

  alert(name && message ? name + ': ' + message : message)
}

/**
 * ? SET GLOBAL META
 * * Sets the metadata of the website including language & favicon
 *
 * @param {string} [lang="en"] - The language code to set in the metadata
 * @param {string} [icon="img/favicon.ico"] - The path to the favicon to set in the metadata
 * @returns {void}
 */
export const setGlobalMeta = (lang: string = 'en', icon: string = 'img/favicon.ico'): void => {
  const iconElt: HTMLLinkElement | null = document.querySelector('[rel="icon"]')

  document.documentElement.lang = lang

  if (iconElt) iconElt.href = icon
}

/**
 * ? SET META
 * * Sets the metadata of the page including title, description, URL, and image
 *
 * @param {string} title - The title to set
 * @param {string} description - The description to set
 * @param {string} url - The URL to set
 * @param {string|null} [image] - The image to set
 * @returns {void}
 */
export const setMeta = (title: string, description: string, url: string, image: string | null): void => {
  const titleTag: HTMLTitleElement | null = document.querySelector('title')
  const canonicalTag: HTMLLinkElement | null = document.querySelector('[rel="canonical"]')
  const descriptionTag: HTMLMetaElement | null = document.querySelector('[name="description"]')

  const ogTitleTag: HTMLMetaElement | null = document.querySelector('[property="og:title"]')
  const ogUrlTag: HTMLMetaElement | null = document.querySelector('[property="og:url"]')
  const ogDescriptionTag: HTMLMetaElement | null = document.querySelector('[property="og:description"]')
  const ogImageTag: HTMLMetaElement | null = image ? document.querySelector('[property="og:image"]') : null

  if (titleTag) titleTag.innerText = title
  if (canonicalTag) canonicalTag.href = url
  if (descriptionTag) descriptionTag.setAttribute('content', description)

  if (ogTitleTag) ogTitleTag.setAttribute('content', title)
  if (ogUrlTag) ogUrlTag.setAttribute('content', url)
  if (ogDescriptionTag) ogDescriptionTag.setAttribute('content', description)
  if (image && ogImageTag) ogImageTag.setAttribute('content', image)
}
