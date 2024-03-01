import val from "../app/values"
import { getData, setError } from "../app/services"

const actions = {

  // ! ********** ARTICLES **********

  /**
   * ? LIST ARTICLES
   * * Asynchronously lists all articles.
   * @param {Object} context - The context object.
   */
  async listArticles(context) {
    getData(`${val.API_URL}/articles`)
      .then(articles => { context.commit("setArticles", articles) })
      .catch(err => { setError(err) });
  },

  /**
   * ? READ ARTICLE
   * * Asynchronously reads an article using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the article.
   */
  async readArticle(context, id) {
    getData(`${val.API_URL}/articles/${id}`)
      .then(article => { context.commit("setArticle", article) })
      .catch(err => { setError(err) });
  },

  // ! ********** AUTH **********

  /**
   * ? READ AVATAR
   * * Asynchronously reads an avatar using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the avatar.
   */
  async readAvatar(context, id) {
    getData(`${val.API_URL}/auth/${id}`)
      .then(avatar => { context.commit("setAvatar", avatar) })
      .catch(err => { setError(err) });
  },

  // ! ********** GALLERIES **********

  /**
   * ? LIST GALLERIES
   * * Asynchronously lists all galleries.
   * @param {Object} context - The context object.
   */
  async listGalleries(context) {
    getData(`${val.API_URL}/galleries`)
      .then(galleries => { context.commit("setGalleries", galleries) })
      .catch(err => { setError(err) });
  },

  // ! ********** IMAGES **********

  /**
   * ? LIST GALLERY IMAGES
   * * Asynchronously lists gallery images using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the gallery.
   */
  async listGalleryImages(context, id) {
    getData(`${val.API_URL}/images/${id}`)
      .then(images => { context.commit("setImages", images) })
      .catch(err => { setError(err) });
  },

  /**
   * ? LIST IMAGES
   * * Asynchronously lists all images.
   * @param {Object} context - The context object.
   */
  async listImages(context) {
    getData(`${val.API_URL}/images`)
      .then(images => { context.commit("setImages", images) })
      .catch(err => { setError(err) });
  },

  // ! ********** LINKS **********

  /**
   * ? LIST LINKS
   * * Asynchronously lists all links.
   * @param {Object} context - The context object.
   */
  async listLinks(context) {
    getData(`${val.API_URL}/links`)
      .then(links => { context.commit("setLinks", links) })
      .catch(err => { setError(err) });
  },

  // ! ********** ORDERS **********

  /**
   * ? LIST ORDERS
   * * Asynchronously lists all orders.
   * @param {object} context - The context object.
   */
  async listOrders(context) {
    getData(`${val.API_URL}/orders`, context.rootState.token)
      .then(orders => { context.commit("setOrders", orders) })
      .catch(err => { setError(err) });
  },

  /**
   * ? LIST USER ORDERS
   * * Asynchronously lists user orders using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the user.
   */
  async listUserOrders(context, id) {
    getData(`${val.API_URL}/orders/${id}`, context.rootState.token)
      .then(orders => { context.commit("setUserOrders", orders) })
      .catch(err => { setError(err) });
  },

  // ! ********** PRODUCTS **********

  /**
   * ? LIST PRODUCTS
   * * Asynchronously lists all products.
   * @param {Object} context - The context object.
   */
  async listProducts(context) {
    getData(`${val.API_URL}/products`)
      .then(products => { context.commit("setProducts", products) })
      .catch(err => { setError(err) });
  },

  /**
   * ? READ PRODUCT
   * * Asynchronously reads a product using the specified ID.
   * @param {Object} context - The context object.
   * @param {number} id - The ID of the product.
   */
  async readProduct(context, id) {
    getData(`${val.API_URL}/products/${id}`)
      .then(product => { context.commit("setProduct", product) })
      .catch(err => { setError(err) });
  },

  // ! ********** PROJECTS **********

  /**
   * ? LIST PROJECTS
   * * Asynchronously lists all projects.
   * @param {Object} context - The context object.
   */
  async listProjects(context) {
    getData(`${val.API_URL}/projects`)
      .then(projects => { context.commit("setProjects", projects) })
      .catch(err => { setError(err) });
  },

  // ! ********** USERS **********

  /**
   * ? LIST USERS
   * * Asynchronously lists all users.
   * @param {Object} context - The context object.
   */
  async listUsers(context) {
    getData(`${val.API_URL}/users`, context.rootState.token)
      .then(users => { context.commit("setUsers", users) })
      .catch(err => { setError(err) });
  },

  /**
   * ? READ USER
   * * Asynchronously reads a user using the specified ID.
   * @param {Object} context - The context object.
   * @param {string} id - The ID of the user.
   */
  async readUser(context, id) {
    getData(`${val.API_URL}/users/${id}`, context.rootState.token)
      .then(user => { context.commit("setUser", user) })
      .catch(err => { setError(err) });
  }
}

export default actions;
