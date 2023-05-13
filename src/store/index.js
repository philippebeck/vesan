import { createStore } from "vuex"
import { getData } from "../assets/axios"
import { checkError, fetchGet } from "../assets/serve"
import constants from "/constants"

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
    comments:   [],
    galleries:  [],
    images:     [],
    links:      [],
    orders:     [],
    products:   [],
    reviews:    [],
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
    getComments:  state => state.comments,
    getGalleries: state => state.galleries,
    getImages:    state => state.images,
    getLinks:     state => state.links,
    getOrders:    state => state.orders,
    getProducts:  state => state.products,
    getReviews:   state => state.reviews,
    getUsers:     state => state.users,
  },

  mutations: {
    //! ******************** OBJECT MUTATIONS ********************

    SET_ARTICLE(state, article) { state.article = article },
    SET_GALLERY(state, gallery) { state.gallery = gallery },
    SET_PRODUCT(state, product) { state.product = product },
    SET_USER(state, user) { state.user = user },

    //! ******************** ARRAY MUTATIONS ********************

    SET_ARTICLES(state, articles) { state.articles = articles },
    SET_COMMENTS(state, comments) { state.comments = comments },
    SET_GALLERIES(state, galleries) { state.galleries = galleries },
    SET_IMAGES(state, images) { state.images = images },
    SET_LINKS(state, links) { state.links = links },

    SET_USER_ORDERS(state, orders) {
      for (let order of orders) { delete order.user }
      state.orders = orders
    },

    SET_ORDERS(state, orders) { state.orders = orders },
    SET_PRODUCTS(state, products) { state.products = products },
    SET_REVIEWS(state, reviews) { state.reviews = reviews },
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
      fetchGet(constants.API_URL + "/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! READ AVATAR
     * @param {object} context 
     * @param {string} id 
     */
    async readAvatar(context, id) {
      fetchGet(constants.API_URL + "/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! READ GALLERY
     * @param {object} context 
     * @param {string} id 
     */
    async readGallery(context, id) {
      fetchGet(constants.API_URL + "/galleries/" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! READ PRODUCT
     * @param {object} context 
     * @param {string} id 
     */
    async readProduct(context, id) {
      fetchGet(constants.API_URL + "/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { checkError(err) });
    },

    //! ******************** PRIVATE OBJECT ********************

    /**
     * ! READ USER
     * @param {object} context 
     * @param {string} id 
     */
    async readUser(context, id) {
      getData("/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { checkError(err) });
    },

    //! ******************** PUBLIC ARRAY ********************

    /**
     * ! LIST ARTICLE COMMENTS
     * @param {object} context 
     * @param {string} id 
     */
    async listArticleComments(context, id) {
      fetchGet(constants.API_URL + "/comments/" + id)
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST ARTICLES
     * @param {object} context 
     */
    async listArticles(context) {
      fetchGet(constants.API_URL + "/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST COMMENTS
     * @param {object} context 
     */
    async listComments(context) {
      fetchGet(constants.API_URL + "/comments")
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST GALLERIES
     * @param {object} context 
     */
    async listGalleries(context) {
      fetchGet(constants.API_URL + "/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST GALLERY IMAGES
     * @param {object} context 
     * @param {string} id 
     */
    async listGalleryImages(context, id) {
      fetchGet(constants.API_URL + "/images/" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST LINKS
     * @param {object} context 
     */
    async listLinks(context) {
      fetchGet(constants.API_URL + "/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST PRODUCT REVIEWS
     * @param {object} context 
     * @param {string} id 
     */
    async listProductReviews(context, id) {
      fetchGet(constants.API_URL + "/reviews/" + id)
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST PRODUCTS
     * @param {object} context 
     */
    async listProducts(context) {
      fetchGet(constants.API_URL + "/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST REVIEWS
     * @param {object} context 
     */
    async listReviews(context) {
      fetchGet(constants.API_URL + "/reviews")
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { checkError(err) });
    },

    //! ******************** PRIVATE ARRAY ********************

    /**
     * ! LIST IMAGES
     * @param {object} context 
     */
    async listImages(context) {
      getData("/images")
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST USER ORDERS
     * @param {object} context 
     * @param {string} id 
     */
    async listUserOrders(context, id) {
      getData("/orders/" + id)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST ORDERS
     * @param {object} context 
     */
    async listOrders(context) {
      getData("/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { checkError(err) });
    },

    /**
     * ! LIST USERS
     * @param {object} context 
     */
    async listUsers(context) {
      getData("/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { checkError(err) });
    }
  }
})
