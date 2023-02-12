import { createStore } from "vuex"

import articles from "./modules/articles"
import comments from "./modules/comments"
import links from "./modules/links"
import products from "./modules/products"
import reviews from "./modules/reviews"
import users from "./modules/users"

export default createStore({
  modules: {
    articles,
    comments,
    links,
    products,
    reviews,
    users
  }
})
