import { createStore } from "vuex"
import serve from "servidio/dist/serve"

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
    // OBJECT
    async readArticle(context, id) {
      serve.getData("/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { serve.checkError(err) });
    },

    async readAvatar(context, id) {
      serve.getData("/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { serve.checkError(err) });
    },

    async readGallery(context, id) {
      serve.getData("/galleries/" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { serve.checkError(err) });
    },

    async readProduct(context, id) {
      serve.getData("/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { serve.checkError(err) });
    },

    async readUser(context, id) {
      serve.getData("/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { serve.checkError(err) });
    },

    // ARRAY
    async listArticleComments(context, id) {
      serve.getData("/comments/" + id)
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listArticles(context) {
      serve.getData("/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listComments(context) {
      serve.getData("/comments")
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listGalleries(context) {
      serve.getData("/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listGalleryImages(context, id) {
      serve.getData("/images/" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listImages(context) {
      serve.getData("/images")
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listLinks(context) {
      serve.getData("/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listUserOrders(context, id) {
      serve.getData("/orders/" + id)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listOrders(context) {
      serve.getData("/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listProductReviews(context, id) {
      serve.getData("/reviews/" + id)
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listProducts(context) {
      serve.getData("/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listReviews(context) {
      serve.getData("/reviews")
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { serve.checkError(err) });
    },

    async listUsers(context) {
      serve.getData("/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { serve.checkError(err) });
    }
  }
})
