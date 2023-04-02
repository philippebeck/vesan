import { createApp } from "vue"
import { createStore } from "vuex"
import App from "../App.vue"
import serve from "servidio"

const app = createApp(App)
app.config.globalProperties.$serve = serve

export default createStore({
  namespaced: true,

  state: {
    article: {},
    product: {},
    user: {},

    articles: [],
    comments: [],
    gallery: [],
    galleries: [],
    images: [],
    links: [],
    orders: [],
    products: [],
    reviews: [],
    users: []
  },

  getters: {
    getArticle: state => state.article,
    getArticles: state => state.articles,

    getComments: state => state.comments,

    getGallery: state => state.gallery,
    getGalleries: state => state.galleries,

    getImages: state => state.images,

    getLinks: state => state.links,

    getOrders: state => state.orders,

    getProduct: state => state.product,
    getProducts: state => state.products,

    getReviews: state => state.reviews,

    getUser: state => state.user,
    getUsers: state => state.users,
  },

  mutations: {
    /* ARTICLE */
    SET_ARTICLE(state, article) {
      state.article = article
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },

    /* COMMENT */
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },

    /* GALLERIES */
    SET_GALLERY(state, gallery) {
      state.gallery = gallery
    },
    SET_GALLERIES(state, galleries) {
      state.galleries = galleries
    },
    SET_IMAGES(state, images) {
      state.images = images
    },

    /* LINK */
    SET_LINKS(state, links) {
      state.links = links
    },

    /* ORDER */
    SET_USER_ORDERS(state, orders) {
      for (let order of orders) {
        delete order.user;
      }
      state.orders = orders
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },

    /* PRODUCT */
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    /* REVIEW */
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },

    /* USER */
    SET_USER(state, user) {
      state.user = user
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },

  actions: {
    /* ARTICLE */
    async readArticle(context, id) {
      app.config.globalProperties.$serve.getData("/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listArticles(context) {
      app.config.globalProperties.$serve.getData("/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* AUTH */
    async readAvatar(context, id) {
      app.config.globalProperties.$serve.getData("/auth/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* COMMENT */
    async listArticleComments(context, id) {
      app.config.globalProperties.$serve.getData("/comments/" + id)
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listComments(context) {
      app.config.globalProperties.$serve.getData("/comments")
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* GALLERY */
    async readGallery(context, id) {
      app.config.globalProperties.$serve.getData("/galleries" + id)
        .then(res => { context.commit("SET_GALLERY", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listGalleries(context) {
      app.config.globalProperties.$serve.getData("/galleries")
        .then(res => { context.commit("SET_GALLERIES", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listGalleryImages(context, id) {
      app.config.globalProperties.$serve.getData("/images" + id)
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listImages(context) {
      app.config.globalProperties.$serve.getData("/images")
        .then(res => { context.commit("SET_IMAGES", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* LINK */
    async listLinks(context) {
      app.config.globalProperties.$serve.getData("/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* ORDER */
    async listUserOrders(context, id) {
      app.config.globalProperties.$serve.getData("/orders/" + id)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listOrders(context) {
      app.config.globalProperties.$serve.getData("/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* PRODUCT */
    async readProduct(context, id) {
      app.config.globalProperties.$serve.getData("/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listProducts(context) {
      app.config.globalProperties.$serve.getData("/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* REVIEW */
    async listProductReviews(context, id) {
      app.config.globalProperties.$serve.getData("/reviews/" + id)
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listReviews(context) {
      app.config.globalProperties.$serve.getData("/reviews")
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    /* USER */
    async readUser(context, id) {
      app.config.globalProperties.$serve.getData("/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    },

    async listUsers(context) {
      app.config.globalProperties.$serve.getData("/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { app.config.globalProperties.$serve.checkError(err) });
    }
  }
})
