import { createStore } from "vuex"
import { checkError, fetchGet, fetchSet } from "../assets/serve"
import constants from "/constants"

export default createStore({
  namespaced: true,

  state: {
    // OBJECT
    article:  {},
    gallery:  {},
    product:  {},
    user:     {},

    // ARRAY
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
    // OBJECT
    getArticle: state => state.article,
    getGallery: state => state.gallery,
    getProduct: state => state.product,
    getUser:    state => state.user,

    // ARRAY
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
    // OBJECT
    SET_ARTICLE(state, article) { state.article = article },
    SET_GALLERY(state, gallery) { state.gallery = gallery },
    SET_PRODUCT(state, product) { state.product = product },
    SET_USER(state, user) { state.user = user },

    // ARRAY
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
    // PUBLIC OBJECT
    async readArticle(context, id) {
      fetchGet(constants.API_URL + "/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { checkError(err) });
    },

    async readAvatar(context, id) {
      fetchGet(constants.API_URL + "/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { checkError(err) });
    },

    async readGallery(context, id) {
      fetchGet(constants.API_URL + "/galleries/" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { checkError(err) });
    },

    async readProduct(context, id) {
      fetchGet(constants.API_URL + "/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { checkError(err) });
    },

    // PRIVATE OBJECT
    async readUser(context, id) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${constants.TOKEN}` }
      };

      fetchSet(constants.API_URL + "/users/" + id, options)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { checkError(err) });
    },

    // PUBLIC ARRAY
    async listArticleComments(context, id) {
      fetchGet(constants.API_URL + "/comments/" + id)
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { checkError(err) });
    },

    async listArticles(context) {
      fetchGet(constants.API_URL + "/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { checkError(err) });
    },

    async listComments(context) {
      fetchGet(constants.API_URL + "/comments")
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { checkError(err) });
    },

    async listGalleries(context) {
      fetchGet(constants.API_URL + "/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { checkError(err) });
    },

    async listGalleryImages(context, id) {
      fetchGet(constants.API_URL + "/images/" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { checkError(err) });
    },

    async listLinks(context) {
      fetchGet(constants.API_URL + "/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { checkError(err) });
    },

    async listProductReviews(context, id) {
      fetchGet(constants.API_URL + "/reviews/" + id)
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { checkError(err) });
    },

    async listProducts(context) {
      fetchGet(constants.API_URL + "/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { checkError(err) });
    },

    async listReviews(context) {
      fetchGet(constants.API_URL + "/reviews")
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { checkError(err) });
    },

    // PRIVATE ARRAY
    async listImages(context) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${constants.TOKEN}` }
      };

      fetchSet(constants.API_URL + "/images", options)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { checkError(err) });
    },

    async listUserOrders(context, id) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${constants.TOKEN}` }
      };

      fetchSet(constants.API_URL + "/orders/" + id, options)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { checkError(err) });
    },

    async listOrders(context) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${constants.TOKEN}` }
      };

      fetchSet(constants.API_URL + "/orders", options)
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { checkError(err) });
    },

    async listUsers(context) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${constants.TOKEN}` }
      };

      fetchSet(constants.API_URL + "/users", options)
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { checkError(err) });
    }
  }
})
