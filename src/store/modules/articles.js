import { createApp } from "vue"
import App from "../../App.vue"
import serve from "servidio"

const app = createApp(App)
app.config.globalProperties.$serve = serve

export default {
  namespaced: true,

  state: {
    count: 5,
    articles: [],
    article: {}
  },

  getters: {
    articles: state => state.articles,
    article: state => state.article
  },

  mutations: {
    setArticles(state, articles) {
      state.articles = articles
    },
    setArticle(state, article) {
      state.article = article
    }
  },

  actions: {
    async listArticles() {
      app.config.globalProperties.$serve.getData("/api/articles")
        .then(res => { this.articles = res })
        .catch(err => { console.log(err) });
    },

    async getArticle(id) {
      app.config.globalProperties.$serve.getData("/api/articles/" + id)
        .then(res => { this.article = res })
        .catch(err => { console.log(err) });
    }
  }
}
