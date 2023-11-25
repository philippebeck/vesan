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

    SET_ARTICLE(state, article) { state.article = article },
    SET_GALLERY(state, gallery) { state.gallery = gallery },

    SET_PRODUCT(state, product) { 
      product.options = product.options.join(",")
      state.product = product 
    },

    SET_USER(state, user) { state.user = user },

    //! ******************** ARRAY MUTATIONS ********************

    SET_ARTICLES(state, articles) { state.articles = articles },
    SET_GALLERIES(state, galleries) { state.galleries = galleries },
    SET_IMAGES(state, images) { state.images = images },
    SET_LINKS(state, links) { state.links = links },

    SET_USER_ORDERS(state, orders) {
      for (let order of orders) { delete order.user }
      state.orders = orders
    },

    SET_ORDERS(state, orders) { state.orders = orders },

    SET_PRODUCTS(state, products) { 
      for (let product of products) { product.options = product.options.join(",") }
      state.products = products 
    },
  
    SET_USERS(state, users) { state.users = users }
  },

  actions: {
    //! ******************** PUBLIC OBJECT ********************

    /**
     * ! READ ARTICLE
     * @param {object} context 
     * @param {string} id 
     */
    async readArticle(context, id) {
      getData(constants.API_URL + "/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! READ AVATAR
     * @param {object} context 
     * @param {string} id 
     */
    async readAvatar(context, id) {
      getData(constants.API_URL + "/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! READ GALLERY
     * @param {object} context 
     * @param {string} id 
     */
    async readGallery(context, id) {
      getData(constants.API_URL + "/galleries/" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! READ PRODUCT
     * @param {object} context 
     * @param {string} id 
     */
    async readProduct(context, id) {
      getData(constants.API_URL + "/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PRIVATE OBJECT ********************

    /**
     * ! READ USER
     * @param {object} context 
     * @param {string} id 
     */
    async readUser(context, id) {
      getData(constants.API_URL + "/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PUBLIC ARRAY ********************

    /**
     * ! LIST ARTICLES
     * @param {object} context 
     */
    async listArticles(context) {
      getData(constants.API_URL + "/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST GALLERIES
     * @param {object} context 
     */
    async listGalleries(context) {
      getData(constants.API_URL + "/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST GALLERY IMAGES
     * @param {object} context 
     * @param {string} id 
     */
    async listGalleryImages(context, id) {
      getData(constants.API_URL + "/images/" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST LINKS
     * @param {object} context 
     */
    async listLinks(context) {
      getData(constants.API_URL + "/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST PRODUCTS
     * @param {object} context 
     */
    async listProducts(context) {
      getData(constants.API_URL + "/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { setError(err) });
    },

    //! ******************** PRIVATE ARRAY ********************

    /**
     * ! LIST IMAGES
     * @param {object} context 
     */
    async listImages(context) {
      getData(constants.API_URL + "/images")
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST USER ORDERS
     * @param {object} context 
     * @param {string} id 
     */
    async listUserOrders(context, id) {
      getData(constants.API_URL + "/orders/" + id)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST ORDERS
     * @param {object} context 
     */
    async listOrders(context) {
      getData(constants.API_URL + "/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { setError(err) });
    },

    /**
     * ! LIST USERS
     * @param {object} context 
     */
    async listUsers(context) {
      getData(constants.API_URL + "/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { setError(err) });
    }
  }
})
