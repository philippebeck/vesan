import constants from "./constants"
import { getData, setError } from "servidio"
import { createStore } from "vuex"

export default createStore({
  namespaced: true,

  state: {
    //! ******************** OBJECT STATE ********************

    article:  {},
    gallery:  {},
    product:  {},
    user:     {},

    //! ******************** ARRAY STATE ********************

    articles:   [],
    galleries:  [],
    images:     [],
    links:      [],
    orders:     [],
    products:   [],
    users:      []
  },

  getters: {

    //! ******************** OBJECT GETTERS ********************

    getArticle: state => state.article,
    getGallery: state => state.gallery,
    getProduct: state => state.product,
    getUser:    state => state.user,

    //! ******************** ARRAY GETTERS ********************

    getArticles:  state => state.articles,
    getGalleries: state => state.galleries,
    getImages:    state => state.images,
    getLinks:     state => state.links,
    getOrders:    state => state.orders,
    getProducts:  state => state.products,
    getUsers:     state => state.users,
  },

  mutations: {
    //! ******************** OBJECT MUTATIONS ********************

    /**
     * ? SET ARTICLE
     * Sets the value of the 'article' property in the state object.
     *
     * @param {any} state - The state object.
     * @param {any} article - The new value for the 'article' property.
     */
    SET_ARTICLE(state, article) {
      state.article = article;
    },

    /**
     * ? SET GALLERY
     * Sets the gallery state to the provided value.
     *
     * @param {any} state - The current state object.
     * @param {any} gallery - The new gallery value to set.
     */
    SET_GALLERY(state, gallery) {
      state.gallery = gallery;
    },

    /**
     * ? SET PRODUCT
     * Updates the state with the given product.
     *
     * @param {Object} state - The current state object.
     * @param {Object} product - The product object to be set in the state.
     * @param {Array} product.options - The options array of the product.
     */
    SET_PRODUCT(state, product) {
      state.product = product;
    },

    /**
     * ? SET USER
     * Sets the value of the user property in the state object.
     *
     * @param {any} state - The state object.
     * @param {any} user - The user object.
     */
    SET_USER(state, user) {
      state.user = user;
    },

    //! ******************** ARRAY MUTATIONS ********************

    /**
     * ? SET ARTICLES
     * Sets the value of the articles state property.
     *
     * @param {any} state - The state object.
     * @param {Array} articles - The new value for the articles property.
     */
    SET_ARTICLES(state, articles) {
      for (let article of articles) {
        article.likes = JSON.parse(article.likes);
      }
      state.articles = articles;
    },

    /**
     * ? SET GALLERIES
     * Mutates the state by setting the galleries.
     *
     * @param {Object} state - The current state object.
     * @param {Array} galleries - The new galleries to be set.
     */
    SET_GALLERIES(state, galleries) {
      state.galleries = galleries;
    },

    /**
     * ? SET IMAGES
     * Sets the images in the state.
     *
     * @param {state} state - The current state object.
     * @param {Array} images - An array of images to be set in the state.
     */
    SET_IMAGES(state, images) {
      state.images = images;
    },

    /**
     * ? SET LINKS
     * Set the links in the state.
     *
     * @param {Object} state - The state object.
     * @param {Array} links - The array of links to be set.
     */
    SET_LINKS(state, links) {
      state.links = links;
    },

    /**
     * ? SET USER ORDERS
     * Remove the "user" property from each order 
     * And update the state with the new orders.
     *
     * @param {object} state - The current state of the application.
     * @param {array} orders - An array of order objects.
     */
    SET_USER_ORDERS(state, orders) {
      for (let order of orders) { delete order.user }
      state.orders = orders
    },

    /**
     * ? SET ORDERS
     * Set the orders in the state.
     *
     * @param {any} state - The state object.
     * @param {Array} orders - The orders to be set.
     */
    SET_ORDERS(state, orders) { 
      state.orders = orders;
    },

    /**
     * ? SET PRODUCTS
     * Set the products in the state.
     *
     * @param {Object} state - The state object.
     * @param {Array} products - The products to be set in the state.
     */
    SET_PRODUCTS(state, products) { 
      state.products = products;
    },
  
    /**
     * ? SET USERS
     * Set the users in the state.
     *
     * @param {object} state - The state object.
     * @param {Array} users - The array of users to set.
     */
    SET_USERS(state, users) { 
      state.users = users;
    }
  },

  actions: {
    //! ******************** PUBLIC OBJECT ********************

    /**
     * ? READ ARTICLE
     * Reads an article from the API 
     * And commits the result to the context.
     *
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the article to read.
     * @return {Promise} A promise that resolves 
     * when the article is read & committed to the context.
     */
    async readArticle(context, id) {
      getData(constants.API_URL + "/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { setError(err) });
    },


    /**
     * ? READ AVATAR
     * Reads the avatar from the specified context & id.
     *
     * @param {Object} context - The context object.
     * @param {string} id - The id of the avatar.
     * @return {Promise} A promise that resolves 
     * to the result of reading the avatar.
     */
    async readAvatar(context, id) {
      getData(constants.API_URL + "/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? READ GALLERY
     * Reads a gallery from the server 
     * And commits it to the context.
     *
     * @param {Object} context - The Vuex store context.
     * @param {string} id - The ID of the gallery to read.
     * @return {Promise} A promise that resolves when the gallery is
     * successfully read & committed, or rejects with an error.
     */
    async readGallery(context, id) {
      getData(constants.API_URL + "/galleries/" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? READ PRODUCT
     * Reads a product from the API using the specified ID.
     *
     * @param {Object} context - The context object.
     * @param {number} id - The ID of the product to read.
     * @return {Promise} A promise that resolves with the product data.
     */
    async readProduct(context, id) {
      getData(constants.API_URL + "/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PRIVATE OBJECT ********************

    /**
     * ? READ USER
     * Read a user from the API 
     * And update the state with the retrieved user.
     *
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the user to be retrieved.
     * @return {Promise} A promise that resolves 
     * when the user is successfully retrieved & the state is updated.
     */
    async readUser(context, id) {
      getData(constants.API_URL + "/users/" + id, constants.TOKEN)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PUBLIC ARRAY ********************

    /**
     * ? LIST ARTICLES
     * Asynchronously lists articles.
     *
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves 
     * with the result of the API call.
     */
    async listArticles(context) {
      getData(constants.API_URL + "/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { setError(err) });
    },

/**
 * ? LIST GALLERIES
 * Fetches a list of galleries from the API 
 * And sets them in the context state.
 *
 * @param {Object} context - The Vuex context object.
 * @return {Promise} A promise that resolves 
 * when the galleries are set in the context state.
 */
    async listGalleries(context) {
      getData(constants.API_URL + "/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST IMAGES
     * Retrieves a list of gallery images 
     * from the server & updates the state.
     *
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the gallery.
     * @return {Promise} A promise that resolves when the images 
     * have been retrieved and the state has been updated.
     */
    async listGalleryImages(context, id) {
      getData(constants.API_URL + "/images/" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST LINKS
     * Asynchronously lists links.
     *
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listLinks(context) {
      getData(constants.API_URL + "/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST PRODUCTS
     * Asynchronously lists products.
     *
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listProducts(context) {
      getData(constants.API_URL + "/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PRIVATE ARRAY ********************

    /**
     * ? LIST IMAGES
     * Retrieves a list of images from the API 
     * And updates the state with the result.
     *
     * @param {Object} context - The Vuex context object.
     * @return {Promise} A Promise that resolves 
     * with the result of the API call.
     */
    async listImages(context) {
      getData(constants.API_URL + "/images", constants.TOKEN)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST USER ORDERS
     * Retrieves a list of user orders.
     *
     * @param {Object} context - The context object.
     * @param {string} id - The ID of the user.
     * @return {Promise} A promise that resolves 
     * with the user orders or rejects with an error.
     */
    async listUserOrders(context, id) {
      getData(constants.API_URL + "/orders/" + id, constants.TOKEN)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST ORDERS
     * Async function to list orders.
     *
     * @param {object} context - The context object.
     * @return {Promise} A promise that resolves 
     * with the list of orders.
     */
    async listOrders(context) {
      getData(constants.API_URL + "/orders", constants.TOKEN)
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST USERS
     * Retrieves a list of users asynchronously.
     *
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves 
     * with the list of users.
     */
    async listUsers(context) {
      getData(constants.API_URL + "/users", constants.TOKEN)
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { setError(err) });
    }
  }
})
