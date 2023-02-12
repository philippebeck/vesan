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
    links: [],
    orders: [],
    products: [],
    reviews: [],
    users: []
  },

  getters: {
    getArticle: state => state.article,
    getProduct: state => state.product,
    getUser: state => state.user,

    getArticles: state => state.articles,
    getComments: state => state.comments,
    getLinks: state => state.links,
    getOrders: state => state.orders,
    getProducts: state => state.products,
    getReviews: state => state.reviews,
    getUsers: state => state.users,
  },

  mutations: {
    SET_ARTICLE(state, article) {
      state.article = article
    },
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_USER(state, user) {
      state.user = user
    },

    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_LINKS(state, links) {
      state.links = links
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },

  actions: {
    async checkUsers(context) {
      app.config.globalProperties.$serve.getData("/api/users/check")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { console.log(err) });
    },

    async getArticle(context, id) {
      app.config.globalProperties.$serve.getData("/api/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { console.log(err) });
    },
    async getProduct(context, id) {
      app.config.globalProperties.$serve.getData("/api/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { console.log(err) });
    },
    async getUser(context, id) {
      app.config.globalProperties.$serve.getData("/api/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { console.log(err) });
    },

    async listArticles(context) {
      app.config.globalProperties.$serve.getData("/api/articles")
        .then(res => { context.commit("SET_ARTICLES", res) })
        .catch(err => { console.log(err) });
    },
    async listComments(context) {
      app.config.globalProperties.$serve.getData("/api/comments")
        .then(res => { context.commit("SET_COMMENTS", res) })
        .catch(err => { console.log(err) });
    },
    async listLinks(context) {
      app.config.globalProperties.$serve.getData("/api/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { console.log(err) });
    },
    async listOrders(context) {
      app.config.globalProperties.$serve.getData("/api/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { console.log(err) });
    },
    async listProducts(context) {
      app.config.globalProperties.$serve.getData("/api/products")
        .then(res => { context.commit("SET_PRODUCTS", res) })
        .catch(err => { console.log(err) });
    },
    async listReviews(context) {
      app.config.globalProperties.$serve.getData("/api/reviews")
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { console.log(err) });
    },
    async listUsers(context) {
      app.config.globalProperties.$serve.getData("/api/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { console.log(err) });
    }
  }
})
