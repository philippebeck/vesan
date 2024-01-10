import { getData, setError } from "servidio"
import { createStore } from "vuex"
import val from "../config/values"

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
    products:   [],
    projects:   []
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
    getProducts:  state => state.products,
    getProjects:  state => state.projects
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
    setOrders(state, orders) {
      for (const order of orders) {
        order.products = JSON.parse(order.products);
      }
      state.orders = orders
    },

    setProduct(state, product) {
      product.options = product.options.split(",");
      state.product = product;
    },

    setProducts(state, products) { 
      for (const product of products) product.options = product.options.split(",");
      state.products = products;
    },

    setProjects(state, projects) { state.projects = projects },

    setUserOrders(state, orders) {
      for (const order of orders) {
        delete order.userId;
        order.products = JSON.parse(order.products);
      }
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
      getData(`${val.API_URL}/auth/${id}`)
        .then(avatar => { context.commit("setAvatar", avatar) })
        .catch(err => { setError(err) });
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
      getData(`${val.API_URL}/users/${id}`, context.rootState.token)
        .then(user => { context.commit("setUser", user) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST USERS
     * * Retrieves a list of users asynchronously.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves with the list of users.
     */
    async listUsers(context) {
      getData(`${val.API_URL}/users`, context.rootState.token)
        .then(users => { context.commit("setUsers", users) })
        .catch(err => { setError(err) });
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
      getData(`${val.API_URL}/articles/${id}`)
        .then(article => { context.commit("setArticle", article) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST ARTICLES
     * * Asynchronously lists articles.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves with the result of the API call.
     */
    async listArticles(context) {
      getData(`${val.API_URL}/articles`)
        .then(articles => { context.commit("setArticles", articles) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST GALLERIES
     * * Fetches a list of galleries from the API & sets them in the context state.
     * @param {Object} context - The Vuex context object.
     * @return {Promise} A promise that resolves when the galleries are set in the context state.
     */
    async listGalleries(context) {
      getData(`${val.API_URL}/galleries`)
        .then(galleries => { context.commit("setGalleries", galleries) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST GALLERY IMAGES
     * * Retrieves a list of gallery images from the server & updates the state.
     * @param {Object} context - The Vuex context object.
     * @param {string} id - The ID of the gallery.
     * @return {Promise} A promise that resolves when the images have been retrieved and the state has been updated.
     */
    async listGalleryImages(context, id) {
      getData(`${val.API_URL}/images/${id}`)
        .then(images => { context.commit("setImages", images) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST IMAGES
     * * Retrieves a list of all images from the server & updates the state.
     * @param {Object} context - The Vuex context object.
     * @return {Promise} A promise that resolves when the images have been retrieved and the state has been updated.
     */
    async listImages(context) {
      getData(`${val.API_URL}/images`)
        .then(images => { context.commit("setImages", images) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST LINKS
     * * Asynchronously lists links.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listLinks(context) {
      getData(`${val.API_URL}/links`)
        .then(links => { context.commit("setLinks", links) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST ORDERS
     * * Async function to list orders.
     * @param {object} context - The context object.
     * @return {Promise} A promise that resolves with the list of orders.
     */
    async listOrders(context) {
      getData(`${val.API_URL}/orders`, context.rootState.token)
        .then(orders => { context.commit("setOrders", orders) })
        .catch(err => { setError(err) });
    },

    /**
     * ? READ PRODUCT
     * * Reads a product from the API using the specified ID.
     * @param {Object} context - The context object.
     * @param {number} id - The ID of the product to read.
     * @return {Promise} A promise that resolves with the product data.
     */
    async readProduct(context, id) {
      getData(`${val.API_URL}/products/${id}`)
        .then(product => { context.commit("setProduct", product) })
        .catch(err => { setError(err) });
    },

    /**
     * ? LIST PRODUCTS
     * * Asynchronously lists products.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
    async listProducts(context) {
      getData(`${val.API_URL}/products`)
        .then(products => { context.commit("setProducts", products) })
        .catch(err => { setError(err) });
    },

        /**
     * ? LIST PROJECTS
     * * Asynchronously lists projects.
     * @param {Object} context - The context object.
     * @return {Promise} A promise that resolves
     */
        async listProjects(context) {
          getData(`${val.API_URL}/projects`)
            .then(projects => { context.commit("setProjects", projects) })
            .catch(err => { setError(err) });
        },

    /**
     * ? LIST USER ORDERS
     * * Retrieves a list of user orders.
     * @param {Object} context - The context object.
     * @param {string} id - The ID of the user.
     * @return {Promise} A promise that resolves with the user orders or rejects with an error.
     */
    async listUserOrders(context, id) {
      getData(`${val.API_URL}/orders/${id}`, context.rootState.token)
        .then(orders => { context.commit("setUserOrders", orders) })
        .catch(err => { setError(err) });
    },

  }
})
