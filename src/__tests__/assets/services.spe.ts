import { beforeEach, describe, expect, test, vi } from 'vitest'
import axios from 'axios'

import {
  checkRange,
  checkRegex,
  checkRole,
  deleteData,
  getData,
  postData,
  putData,
  setAxios,
  getCats,
  getItemName,
  getItemsByCat,
  setError,
  setGlobalMeta,
  setMeta
} from '../../assets/services'

const DEFAULT = 'multipart/form-data'
const TOKEN = 'abc123'
const TYPE = 'application/json'
const URL = 'https://example.com/api'

global.alert = vi.fn()

vi.mock('axios')

beforeEach(() => {
  axios.defaults.headers = {
    common: {},
    post: {},
    get: {},
    put: {},
    delete: {}
  }
})

// ! ******************** CHECKERS TESTS ********************

/**
 * ? CHECK RANGE
 * * Checks whether a given value is within a specified range of min & max values,
 */
describe('checkRange()', () => {
  const msg = 'Value out of range'

  test('should return true if value is within the specified range', () => {
    expect(checkRange(2, msg)).toBe(true)
    expect(checkRange(50, msg)).toBe(true)
    expect(checkRange('aA', msg)).toBe(true)
    expect(checkRange('abcdefghijklmnopqrstuvwxyz', msg)).toBe(true)
  })

  test('should return false if value is not within the specified range', () => {
    expect(checkRange(1, msg)).toBe(false)
    expect(checkRange(251, msg)).toBe(false)
    expect(checkRange('', msg)).toBe(false)
    expect(
      checkRange(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        msg
      )
    ).toBe(false)
  })
})

/**
 * ? CHECK REGEX
 * * Checks if a given value matches a regular expression
 */
describe('checkRegex()', () => {
  test('value matches regex', () => {
    const value = '1234'
    const regex = /^\d+$/
    const msg = 'Value must contain only digits'
    const result = checkRegex(value, msg, regex)

    expect(result).toBe(true)
  })

  test('value does not match regex', () => {
    const value = '12a4'
    const regex = /^\d+$/
    const msg = 'Value must contain only digits'
    const result = checkRegex(value, msg, regex)

    expect(alert).toHaveBeenCalledWith(msg)
    expect(result).toBe(false)
  })
})

/**
 * ? CHECK ROLE
 * * Checks if a given user role has the required role permission
 */
describe('checkRole()', () => {
  test('returns true if userRole is admin & role is admin', () => {
    expect(checkRole('admin', 'admin')).toBe(true)
  })

  test('returns false if userRole is editor & role is admin', () => {
    expect(checkRole('editor', 'admin')).toBe(false)
  })

  test('returns true if userRole is editor & role is editor', () => {
    expect(checkRole('editor', 'editor')).toBe(true)
  })

  test('returns false if userRole is user & role is editor', () => {
    expect(checkRole('user', 'editor')).toBe(false)
  })

  test('returns true if userRole is user & role is user', () => {
    expect(checkRole('user', 'user')).toBe(true)
  })

  test('returns false if userRole is test & role is user', () => {
    expect(checkRole('test', 'user')).toBe(false)
  })
})

// ! ******************** FETCHERS TESTS ********************

/**
 * ? SET AXIOS
 * * Sets Axios default headers
 * * with an optional TOKEN & an optional content-type
 */
describe('setAxios()', () => {
  test('should set the headers for Axios requests without parameter', () => {
    setAxios()

    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should set the headers for Axios requests with only the TOKEN parameter', () => {
    setAxios(TOKEN)

    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should set the headers for Axios requests with all parameters', () => {
    setAxios(TOKEN, TYPE)

    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(TYPE)
  })
})

/**
 * ? POST DATA
 * * Sends a POST request to the specified URL
 * * with the provided data, an optional TOKEN & an optional content-type
 */
describe('postData()', () => {
  const data = { name: 'John Doe', age: 30 }
  const result = { id: 1, name: 'John Doe', age: 30 }

  test('should POST data to the given URL with the provided data', async () => {
    axios.post.mockResolvedValueOnce({ data: result })
    const response = await postData(URL, data)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should POST data to the given URL with the provided data & a TOKEN', async () => {
    axios.post.mockResolvedValueOnce({ data: result })
    const response = await postData(URL, data, TOKEN)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should POST data to the given URL with the provided data, a TOKEN & a content-type', async () => {
    axios.post.mockResolvedValueOnce({ data: result })
    const response = await postData(URL, data, TOKEN, TYPE)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(TYPE)
  })
})

/**
 * ? GET DATA
 * * Sends a GET request to the specified URL
 * * with an optional TOKEN & an optional content-type
 */
describe('getData()', () => {
  const result = { success: true }

  test('should GET data from the given URL', async () => {
    axios.get.mockResolvedValueOnce({ data: result })
    const response = await getData(URL)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should GET data from the given URL with a TOKEN', async () => {
    axios.get.mockResolvedValueOnce({ data: result })
    const response = await getData(URL, TOKEN)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should GET data from the given URL with a TOKEN & a content-type', async () => {
    axios.get.mockResolvedValueOnce({ data: result })
    const response = await getData(URL, TOKEN, TYPE)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(TYPE)
  })
})

/**
 * ? PUT DATA
 * * Sends a PUT request to the specified URL
 * * with the provided data, an optional TOKEN & an optional content-type
 */
describe('putData', () => {
  const data = { name: 'John Doe', age: 30 }
  const result = { id: 1, name: 'John Doe', age: 30 }

  test('should PUT data to the given URL with the provided data', async () => {
    axios.put.mockResolvedValueOnce({ data: result })
    const response = await putData(URL, data)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should PUT data to the given URL with the provided data & a TOKEN', async () => {
    axios.put.mockResolvedValueOnce({ data: result })
    const response = await putData(URL, data, TOKEN)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should PUT data to the given URL with the provided data, a TOKEN & a content-type', async () => {
    axios.put.mockResolvedValueOnce({ data: result })
    const response = await putData(URL, data, TOKEN, TYPE)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(TYPE)
  })
})

/**
 * ? DELETE DATA
 * * Sends a DELETE request to the specified URL
 * * with an optional TOKEN & an optional content-type
 */
describe('deleteData()', () => {
  const result = { success: true }

  test('should DELETE data from the given URL', async () => {
    axios.delete.mockResolvedValueOnce({ data: result })
    const response = await deleteData(URL)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should DELETE data from the given URL with a TOKEN', async () => {
    axios.delete.mockResolvedValueOnce({ data: result })
    const response = await deleteData(URL, TOKEN)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(DEFAULT)
  })

  test('should DELETE data from the given URL with a TOKEN & a content-type', async () => {
    axios.delete.mockResolvedValueOnce({ data: result })
    const response = await deleteData(URL, TOKEN, TYPE)

    expect(response).toBe(result)
    expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${TOKEN}`)
    expect(axios.defaults.headers.post['Content-Type']).toBe(TYPE)
  })
})

// ! ******************** GETTERS TESTS ********************

/**
 * ? GET CATS
 * * Returns an array of unique categories from the given items
 */
describe('getCats()', () => {
  test('returns an empty array when given an empty array', () => {
    const items = []
    const result = getCats(items)

    expect(result).toEqual([])
  })

  test('returns an array with one category when given an array with one item', () => {
    const items = [{ cat: 'A' }]
    const result = getCats(items)

    expect(result).toEqual(['A'])
  })

  test('returns an array with unique categories when given an array with multiple items', () => {
    const items = [{ cat: 'A' }, { cat: 'B' }, { cat: 'A' }, { cat: 'C' }]
    const result = getCats(items)

    expect(result).toEqual(['A', 'B', 'C'])
  })

  test('returns an array with unique categories when given an array with duplicates', () => {
    const items = [{ cat: 'A' }, { cat: 'B' }, { cat: 'A' }, { cat: 'B' }]
    const result = getCats(items)

    expect(result).toEqual(['A', 'B'])
  })
})

/**
 * ? GET ITEM NAME
 * * Returns the name of the item with the given id from the provided array of items
 */
describe('getItemName()', () => {
  test('should return the correct name of the item with the given id', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ]
    const id = '2'
    const expected = 'Item 2'
    const result = getItemName(id, items)

    expect(result).toEqual(expected)
  })

  test('should return false if no item is found with the given id', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ]
    const id = '3'
    const result = getItemName(id, items)

    expect(result).toBe(false)
  })

  test('should return false if the provided items array is empty', () => {
    const items = []
    const id = '1'
    const result = getItemName(id, items)

    expect(result).toBe(false)
  })
})

/**
 * ? GET ITEMS BY CAT
 * * Groups an array of items by category & sorts each category's item list by name
 */
describe('getItemsByCat()', () => {
  const assert = require('assert')

  test("should group an array of items by category & sort each category's item list by id", () => {
    const items = [
      { name: 'apple', cat: 'fruit' },
      { name: 'pear', cat: 'fruit' },
      { name: 'carrot', cat: 'vegetable' },
      { name: 'broccoli', cat: 'vegetable' }
    ]

    const expected = {
      fruit: [
        { name: 'apple', cat: 'fruit' },
        { name: 'pear', cat: 'fruit' }
      ],
      vegetable: [
        { name: 'carrot', cat: 'vegetable' },
        { name: 'broccoli', cat: 'vegetable' }
      ]
    }

    const actual = getItemsByCat(items)

    assert.deepStrictEqual(actual, expected)
  })

  test("should group an array of items by category & sort each category's item list by name", () => {
    const items = [
      { name: 'apple', cat: 'fruit' },
      { name: 'pear', cat: 'fruit' },
      { name: 'carrot', cat: 'vegetable' },
      { name: 'broccoli', cat: 'vegetable' }
    ]

    const expected = {
      fruit: [
        { name: 'apple', cat: 'fruit' },
        { name: 'pear', cat: 'fruit' }
      ],
      vegetable: [
        { name: 'broccoli', cat: 'vegetable' },
        { name: 'carrot', cat: 'vegetable' }
      ]
    }

    const actual = getItemsByCat(items, 'name')

    assert.deepStrictEqual(actual, expected)
  })

  test('should return an empty object if the input array is empty', () => {
    const items = []
    const expected = {}
    const actual = getItemsByCat(items)

    assert.deepStrictEqual(actual, expected)
  })

  test('should handle an array with only one item', () => {
    const items = [{ name: 'apple', cat: 'fruit' }]
    const expected = { fruit: [{ name: 'apple', cat: 'fruit' }] }
    const actual = getItemsByCat(items)

    assert.deepStrictEqual(actual, expected)
  })

  test('should handle an array with items in only one category', () => {
    const items = [
      { name: 'apple', cat: 'fruit' },
      { name: 'kiwi', cat: 'fruit' },
      { name: 'pear', cat: 'fruit' }
    ]

    const expected = {
      fruit: [
        { name: 'apple', cat: 'fruit' },
        { name: 'kiwi', cat: 'fruit' },
        { name: 'pear', cat: 'fruit' }
      ]
    }

    const actual = getItemsByCat(items)

    assert.deepStrictEqual(actual, expected)
  })

  test('should handle an array with items in multiple categories with same names', () => {
    const items = [
      { name: 'apple', cat: 'fruit' },
      { name: 'apple', cat: 'fruit' },
      { name: 'apple', cat: 'vegetable' },
      { name: 'apple', cat: 'vegetable' }
    ]

    const expected = {
      fruit: [
        { name: 'apple', cat: 'fruit' },
        { name: 'apple', cat: 'fruit' }
      ],
      vegetable: [
        { name: 'apple', cat: 'vegetable' },
        { name: 'apple', cat: 'vegetable' }
      ]
    }

    const actual = getItemsByCat(items)

    assert.deepStrictEqual(actual, expected)
  })
})

// ! ******************** SETTERS TESTS ********************

/**
 * ? SET ERROR
 * * Logs an error message from the provided error object
 */
describe('setError()', () => {
  test('logs the error message from the provided error object', () => {
    const error = new Error('Test error message')
    setError(error)

    expect(alert).toHaveBeenCalledWith('Error: Test error message')
  })
})

/**
 * ? SET GLOBAL META
 * * Sets the metadata of the website including language & favicon
 */
describe('setGlobalMeta()', () => {
  const ICON = 'favicon.ico'
  const LANG = 'fr'

  const htmlElt = document.createElement('html')
  const iconElt = document.createElement('link')

  htmlElt.setAttribute('lang', 'en')
  iconElt.setAttribute('rel', 'icon')

  document.head.appendChild(htmlElt)
  document.head.appendChild(iconElt)

  test('sets the default language & the default favicon when no argument is passed', () => {
    setGlobalMeta()

    expect(document.documentElement.lang).toBe('en')
    expect(document.querySelector('[rel="icon"]').href).toEqual(`http://localhost/img/${ICON}`)
  })

  test('sets the language passed as an argument & the default favicon', () => {
    setGlobalMeta(LANG)

    expect(document.documentElement.lang).toBe(LANG)
    expect(document.querySelector('[rel="icon"]').href).toEqual(`http://localhost/img/${ICON}`)
  })

  test('sets the language & the favicon passed as arguments', () => {
    setGlobalMeta(LANG, ICON)

    expect(document.documentElement.lang).toBe(LANG)
    expect(document.querySelector('[rel="icon"]').href).toEqual(`http://localhost/${ICON}`)
  })

  test('should not update the icon element if it does not exist', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(null)

    setGlobalMeta(LANG, ICON)

    expect(document.querySelector).toHaveBeenCalledTimes(1)

    document.querySelector.mockRestore()
  })
})

/**
 * ? SET META
 * * Sets the metadata of the page including title, description, url & image
 */
describe('setMeta()', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <title></title>
      <meta name="description" content="">
      <link rel="canonical" href="">
      <meta property="og:title" content="">
      <meta property="og:description" content="">
      <meta property="og:url" content="">
      <meta property="og:image" content="">
    `
  })

  test('should set the title correctly', () => {
    setMeta('New Title', 'Description', 'https://example.com')

    expect(document.querySelector('title').innerText).toEqual('New Title')
    expect(document.querySelector('[property="og:title"]').getAttribute('content')).toEqual(
      'New Title'
    )
  })

  test('should set the description correctly', () => {
    setMeta('Title', 'New Description', 'https://example.com')

    expect(document.querySelector('[name="description"]').getAttribute('content')).toEqual(
      'New Description'
    )
    expect(document.querySelector('[property="og:description"]').getAttribute('content')).toEqual(
      'New Description'
    )
  })

  test('should set the url correctly', () => {
    setMeta('Title', 'Description', 'https://example.com/new-url')

    expect(document.querySelector('[property="og:url"]').getAttribute('content')).toEqual(
      'https://example.com/new-url'
    )
    expect(document.querySelector('[rel="canonical"]').getAttribute('href')).toEqual(
      'https://example.com/new-url'
    )
  })

  test('should set the image correctly', () => {
    setMeta('Title', 'Description', 'https://example.com', 'https://example.com/image.jpg')

    expect(document.querySelector('[property="og:image"]').getAttribute('content')).toEqual(
      'https://example.com/image.jpg'
    )
  })

  test('should not set the image if it is not provided', () => {
    setMeta('Title', 'Description', 'https://example.com')

    expect(document.querySelector('[property="og:image"]').getAttribute('content')).toEqual('')
  })
})
