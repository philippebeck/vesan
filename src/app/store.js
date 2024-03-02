import { createStore } from "vuex"

import actions from "./actions"
import mutations from "./mutations"

export default createStore({
  namespaced: true,

  state: {
    id:     null,
    token:  null,

    article:  {},
    avatar:   {},
    product:  {},
    user:     {},

    articles:   [],
    galleries:  [],
    images:     [],
    links:      [],
    orders:     [],
    products:   [],
    projects:   [],
    users:      []
  },

  getters: {
    getArticle:   state => state.article,
    getArticles:  state => state.articles,
    getAvatar:    state => state.avatar,
    getGalleries: state => state.galleries,
    getId:        state => state.id,
    getImages:    state => state.images,
    getLinks:     state => state.links,
    getOrders:    state => state.orders,
    getProduct:   state => state.product,
    getProducts:  state => state.products,
    getProjects:  state => state.projects,
    getToken:     state => state.token,
    getUser:      state => state.user,
    getUsers:     state => state.users
  },

  mutations: mutations,
  actions: actions
});
