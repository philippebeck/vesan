import val from "./values"
import { getData, setError } from "./services"

export default {

  // ! ********** ARTICLES **********

  /**
   * ? LIST ARTICLES
   * * Asynchronously lists all articles.
   * @param {Object} context - The context object.
   */
  listArticles: async (context) => {
    try {
      const articles = await getData(`${val.API_URL}/articles`);
      context.commit("setArticles", articles);
    } catch (err) {
      setError(err);
    }
  },

  /**
   * ? READ ARTICLE
   * * Asynchronously reads an article using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the article.
   */
  readArticle: async (context, id) => {
    try {
      const article = await getData(`${val.API_URL}/articles/${id}`);
      context.commit("setArticle", article);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** AUTH **********

  /**
   * ? READ AVATAR
   * * Asynchronously reads an avatar using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the avatar.
   */
  readAvatar: async (context, id) => {
    try {
      const avatar = await getData(`${val.API_URL}/auth/${id}`);
      context.commit("setAvatar", avatar);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** GALLERIES **********

  /**
   * ? LIST GALLERIES
   * * Asynchronously lists all galleries.
   * @param {Object} context - The context object.
   */
  listGalleries: async (context) => {
    try {
      const galleries = await getData(`${val.API_URL}/galleries`);
      context.commit("setGalleries", galleries);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** IMAGES **********

  /**
   * ? LIST GALLERY IMAGES
   * * Asynchronously lists gallery images using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the gallery.
   */
  listGalleryImages: async (context, id) => {
    try {
      const images = await getData(`${val.API_URL}/images/${id}`);
      context.commit("setImages", images);
    } catch (err) {
      setError(err);
    }
  },

  /**
   * ? LIST IMAGES
   * * Asynchronously lists all images.
   * @param {Object} context - The context object.
   */
  listImages: async (context) => {
    try {
      const images = await getData(`${val.API_URL}/images`);
      context.commit("setImages", images);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** LINKS **********

  /**
   * ? LIST LINKS
   * * Asynchronously lists all links.
   * @param {Object} context - The context object.
   */
  listLinks: async (context) => {
    try {
      const links = await getData(`${val.API_URL}/links`);
      context.commit("setLinks", links);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** ORDERS **********

  /**
   * ? LIST ORDERS
   * * Asynchronously lists all orders.
   * @param {object} context - The context object.
   */
  listOrders: async (context) => {
    try {
      const orders = await getData(`${val.API_URL}/orders`, context.rootState.token);
      context.commit("setOrders", orders);
    } catch (err) {
      setError(err);
    }
  },

  /**
   * ? LIST USER ORDERS
   * * Asynchronously lists user orders using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the user.
   */
  listUserOrders: async (context, id) => {
    try {
      const orders = await getData(`${val.API_URL}/orders/${id}`, context.rootState.token);
      context.commit("setUserOrders", orders);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** PRODUCTS **********

  /**
   * ? LIST PRODUCTS
   * * Asynchronously lists all products.
   * @param {Object} context - The context object.
   */
  listProducts: async (context) => {
    try {
      const products = await getData(`${val.API_URL}/products`);
      context.commit("setProducts", products);
    } catch (err) {
      setError(err);
    }
  },

  /**
   * ? READ PRODUCT
   * * Asynchronously reads a product using the specified ID.
   * @param {Object} context - The context object.
   * @param {number} id - The ID of the product.
   */
  readProduct: async (context, id) => {
    try {
      const product = await getData(`${val.API_URL}/products/${id}`);
      context.commit("setProduct", product);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** PROJECTS **********

  /**
   * ? LIST PROJECTS
   * * Asynchronously lists all projects.
   * @param {Object} context - The context object.
   */
  listProjects: async (context) => {
    try {
      const projects = await getData(`${val.API_URL}/projects`);
      context.commit("setProjects", projects);
    } catch (err) {
      setError(err);
    }
  },

  // ! ********** USERS **********

  /**
   * ? LIST USERS
   * * Asynchronously lists all users.
   * @param {Object} context - The context object.
   */
  listUsers: async (context) => {
    try {
      const users = await getData(`${val.API_URL}/users`, context.rootState.token);
      context.commit("setUsers", users);
    } catch (err) {
      setError(err);
    }
  },

  /**
   * ? READ USER
   * * Asynchronously reads a user using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the user.
   */
  readUser: async (context, id) => {
    try {
      const user = await getData(`${val.API_URL}/users/${id}`, context.rootState.token);
      context.commit("setUser", user);
    } catch (err) {
      setError(err);
    }
  }
}
