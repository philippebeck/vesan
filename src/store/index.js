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
    /* BLOG */
    SET_ARTICLE(state, article) {
      state.article = article
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },

    /* LINKS */
    SET_LINKS(state, links) {
      state.links = links
    },

    /* SHOP */
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
    SET_USER_ORDERS(state, orders) {
      for (let order of orders) {
        delete order.user;
      }
      state.orders = orders
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },

    /* USERS */
    SET_USER(state, user) {
      state.user = user
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },

  actions: {
    /* BLOG */
    async readArticle(context, id) {
      app.config.globalProperties.$serve.getData("/api/articles/" + id)
        .then(res => { context.commit("SET_ARTICLE", res) })
        .catch(err => { console.log(err) });
    },
    async listArticleComments(context, id) {
      app.config.globalProperties.$serve.getData("/api/comments/" + id)
        .then(res => { context.commit("SET_COMMENTS", res) })
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

    /* LINKS */
    async listLinks(context) {
      app.config.globalProperties.$serve.getData("/api/links")
        .then(res => { context.commit("SET_LINKS", res) })
        .catch(err => { console.log(err) });
    },

    /* SHOP */
    async readProduct(context, id) {
      app.config.globalProperties.$serve.getData("/api/products/" + id)
        .then(res => { context.commit("SET_PRODUCT", res) })
        .catch(err => { console.log(err) });
    },
    async listProductReviews(context, id) {
      app.config.globalProperties.$serve.getData("/api/reviews/" + id)
        .then(res => { context.commit("SET_REVIEWS", res) })
        .catch(err => { console.log(err) });
    },
    async listUserOrders(context, id) {
      app.config.globalProperties.$serve.getData("/api/orders/" + id)
        .then(res => { context.commit("SET_USER_ORDERS", res) })
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
    async listOrders(context) {
      app.config.globalProperties.$serve.getData("/api/orders")
        .then(res => { context.commit("SET_ORDERS", res) })
        .catch(err => { console.log(err) });
    },

    /* USERS */
    async readAvatar(context, id) {
      app.config.globalProperties.$serve.getData("/api/users/avatar/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { console.log(err) });
    },
    async readUser(context, id) {
      app.config.globalProperties.$serve.getData("/api/users/" + id)
        .then(res => { context.commit("SET_USER", res) })
        .catch(err => { console.log(err) });
    },
    async listUsersName(context) {
      app.config.globalProperties.$serve.getData("/api/users/names")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { console.log(err) });
    },
    async listUsers(context) {
      app.config.globalProperties.$serve.getData("/api/users")
        .then(res => { context.commit("SET_USERS", res) })
        .catch(err => { console.log(err) });
    }
  }
})
