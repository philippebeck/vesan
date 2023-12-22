import { getData, setError } from "servidio"
import { createStore } from "vuex"

export default createStore({
  namespaced: true,

  // ! ******************** STATE ********************
  state: {

    // ? ********** MAIN **********
    avatar: {},
    id:     0,
    token:  "",
    user:   {},
    users:  [],

    // ? ********** DATA **********
    article:    {},
    articles:   [],
    galleries:  [],
    images:     [],
    links:      [],
    orders:     [],
    product:    {},
    products:   []
  },

  // ! ******************** GETTERS ********************
  getters: {

    // ? ********** MAIN **********
    getAvatar:  state => state.avatar,
    getId:      state => state.id,
    getToken:   state => state.token,
    getUser:    state => state.user,
    getUsers:   state => state.users,

    // ? ********** DATA **********
    getArticle:   state => state.article,
    getArticles:  state => state.articles,
    getGalleries: state => state.galleries,
    getImages:    state => state.images,
    getLinks:     state => state.links,
    getOrders:    state => state.orders,
    getProduct:   state => state.product,
    getProducts:  state => state.products
  },

  // ! ******************** MUTATIONS ********************
  mutations: {

    // ? ********** MAIN **********
    setAvatar(state, avatar) { state.avatar = avatar },
    setId(state, id) { state.id = id },
    setToken(state, token) { state.token = token },
    setUser(state, user) { state.user = user },
    setUsers(state, users) { state.users = users },

    // ? ********** DATA **********
    setArticle(state, article) {
      article.likes = JSON.parse(article.likes);
      state.article = article;
    },

    setArticles(state, articles) {
      for (const article of articles) article.likes = JSON.parse(article.likes);
      state.articles = articles;
    },

    setGalleries(state, galleries) { state.galleries = galleries },
    setImages(state, images) { state.images = images },
    setLinks(state, links) { state.links = links },
    setOrders(state, orders) { state.orders = orders },

    setProduct(state, product) {
      product.options = product.options.split(",");
      state.product = product;
    },

    setProducts(state, products) { 
      for (const product of products) product.options = product.options.split(",");
      state.products = products;
    },

    setUserOrders(state, orders) {
      for (const order of orders) delete order.user;
      state.orders = orders;
    },
  },

  // ! ******************** ACTIONS ********************
  actions: {

    // ? ********** MAIN **********

    /**
     * ? READ AVATAR
     * * Reads the avatar from the specified context & id.
     * @param {Object} context - The context object.
     * @param {string} id - The id of the avatar.
     * @return {Promise} A promise that resolves to the result of reading the avatar.
     */
    async readAvatar(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/auth/${id}`)
        .then(avatar => { context.commit("setAvatar", avatar) })
        .catch(setError);
    },

    /**
     * ? READ ID
     * * Reads the ID from the local storage & commits it to the context.
     * @param {Object} context - The Vuex context object.
     */
    readId(context) {
      context.commit("setId", JSON.parse(localStorage.getItem("userId")));
    },

    /**
     * ? READ TOKEN
     * * Reads the token from the local storage & sets it in the context.
     * @param {Object} context - The context object.
     */
    readToken(context) {
      context.commit("setToken", JSON.parse(localStorage.getItem("userToken")));
    },

    /**
     * ? READ USER
     * * Read a user from the API & update the state with the retrieved user.
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the user to be retrieved.
     * @return {Promise} A promise that resolves when the user is successfully retrieved & the state is updated.
     */
    async readUser(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/users/${id}`, context.rootState.token)
        .then(user => { context.commit("setUser", user) })
        .catch(setError);
    },

    /**
     * ? LIST USERS
     * * Retrieves a list of users asynchronously.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves with the list of users.
     */
    async listUsers(context) {
      getData(`${process.env.VUE_APP_API_URL}/users`, context.rootState.token)
        .then(users => { context.commit("setUsers", users) })
        .catch(setError);
    },

    // ? ********** DATA **********

    /**
     * ? READ ARTICLE
     * * Reads an article from the API & commits the result to the context.
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the article to read.
     * @return {Promise} A promise that resolves when the article is read & committed to the context.
     */
    async readArticle(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/articles/${id}`)
        .then(article => { context.commit("setArticle", article) })
        .catch(setError);
    },

    /**
     * ? LIST ARTICLES
     * * Asynchronously lists articles.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves with the result of the API call.
     */
    async listArticles(context) {
      getData(`${process.env.VUE_APP_API_URL}/articles`)
        .then(articles => { context.commit("setArticles", articles) })
        .catch(setError);
    },

    /**
     * ? LIST GALLERIES
     * * Fetches a list of galleries from the API & sets them in the context state.
     * @param {Object} context - The Vuex context object.
     * @return {Promise} A promise that resolves when the galleries are set in the context state.
     */
    async listGalleries(context) {
      getData(`${process.env.VUE_APP_API_URL}/galleries`)
        .then(galleries => { context.commit("setGalleries", galleries) })
        .catch(setError);
    },

    /**
     * ? LIST IMAGES
     * * Retrieves a list of gallery images  * from the server & updates the state.
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the gallery.
     * @return {Promise} A promise that resolves when the images have been retrieved and the state has been updated.
     */
    async listImages(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/images/${id}`)
        .then(images => { context.commit("setImages", images) })
        .catch(setError);
    },

    /**
     * ? LIST LINKS
     * * Asynchronously lists links.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listLinks(context) {
      getData(`${process.env.VUE_APP_API_URL}/links`)
        .then(links => { context.commit("setLinks", links) })
        .catch(setError);
    },

    /**
     * ? LIST ORDERS
     * * Async function to list orders.
     * @param {object} context - The context object.
     * @return {Promise} A promise that resolves with the list of orders.
     */
    async listOrders(context) {
      getData(`${process.env.VUE_APP_API_URL}/orders`, context.rootState.token)
        .then(orders => { context.commit("setOrders", orders) })
        .catch(setError);
    },

    /**
     * ? LIST USER ORDERS
     * * Retrieves a list of user orders.
     * @param {Object} context - The context object.
     * @param {string} id - The ID of the user.
     * @return {Promise} A promise that resolves with the user orders or rejects with an error.
     */
    async listUserOrders(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/orders/${id}`, context.rootState.token)
        .then(orders => { context.commit("setUserOrders", orders) })
        .catch(setError);
    },

    /**
     * ? READ PRODUCT
     * * Reads a product from the API using the specified ID.
     * @param {Object} context - The context object.
     * @param {number} id - The ID of the product to read.
     * @return {Promise} A promise that resolves with the product data.
     */
    async readProduct(context, id) {
      getData(`${process.env.VUE_APP_API_URL}/products/${id}`)
        .then(product => { context.commit("setProduct", product) })
        .catch(setError);
    },

    /**
     * ? LIST PRODUCTS
     * * Asynchronously lists products.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listProducts(context) {
      getData(`${process.env.VUE_APP_API_URL}/products`)
        .then(products => { context.commit("setProducts", products) })
        .catch(setError);
    }
  }
})
