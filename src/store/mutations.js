const mutations = {

  // ! ********** ARTICLES **********

  /**
   * ? SET ARTICLE
   * * Sets an article in the state.
   * @param {Object} state - The state object.
   * @param {Object} article - The article to be set.
   */
  setArticle(state, article) {
    article.likes = JSON.parse(article.likes);
    state.article = article;
  },

  /**
   * ? SET ARTICLES
   * * Sets the articles in the state.
   * @param {Object} state - The state object.
   * @param {Array} articles - The articles to be set.
   */
  setArticles(state, articles) {
    for (const article of articles) article.likes = JSON.parse(article.likes);
    state.articles = articles;
  },

  // ! ********** AUTH **********

    /**
   * ? SET AVATAR
   * * Sets an avatar in the state.
   * @param {Object} state - The state object.
   * @param {Object} avatar - The avatar to be set.
   */
    setAvatar(state, avatar) { 
      state.avatar = avatar;
    },

  /**
   * ? SET ID
   * * Sets an ID of the state.
   * @param {object} state - The state object.
   */
  setId(state) {
    state.id = JSON.parse(localStorage.getItem("userId"));
  },

  /**
   * ? SET TOKEN
   * * Sets a token in the state.
   * @param {Object} state - The state object.
   */
  setToken(state) { 
    state.token = JSON.parse(localStorage.getItem("userToken"));
  },

  // ! ********** GALLERIES **********

  /**
   * ? SET GALLERIES
   * * Sets the galleries in the state.
   * @param {Object} state - The state object.
   * @param {Array} galleries - The galleries to be set.
   */
  setGalleries(state, galleries) {
    state.galleries = galleries;
  },

  // ! ********** IMAGES **********

  /**
   * ? SET IMAGES
   * * Sets the images in the state.
   * @param {Object} state - The state object.
   * @param {Array} images - The images to be set.
   */
  setImages(state, images) {
    state.images = images;
  },

  // ! ********** LINKS **********

  /**
   * ? SET LINKS
   * * Sets the links in the state.
   * @param {Object} state - The state object.
   * @param {Array} links - The links to be set.
   */
  setLinks(state, links) {
    state.links = links;
  },

  // ! ********** ORDERS **********

  /**
   * ? SET ORDERS
   * * Sets the orders in the state.
   * @param {Object} state - The state object.
   * @param {Array} orders - The orders to be set.
   */
  setOrders(state, orders) {
    for (const order of orders) {
      order.products = JSON.parse(order.products);
    }
    state.orders = orders
  },

  /**
   * ? SET USER ORDERS
   * * Sets the user orders in the state.
   * @param {Object} state - The state object.
   * @param {Array} orders - The user orders to be set.
   */
    setUserOrders(state, orders) {
      for (const order of orders) {
        delete order.userId;
        order.products = JSON.parse(order.products);
      }
      state.orders = orders;
    },

  // ! ********** PRODUCTS **********

  /**
   * ? SET PRODUCT
   * * Set a product in the state.
   * @param {Object} state - The state object.
   * @param {Object} product - The product to be set.
   */
  setProduct(state, product) {
    product.options = product.options.split(",");
    state.product = product;
  },

/**
 * ? SET PRODUCTS
 * * Set the products in the state.
 * @param {Object} state - The state object.
 * @param {Array} products - The products to be set.
 */
  setProducts(state, products) { 
    for (const product of products) product.options = product.options.split(",");
    state.products = products;
  },

  // ! ********** PROJECTS **********

  /**
   * ? SET PROJECTS
   * * Sets the projects in the state.
   * @param {Object} state - The state object.
   * @param {Array} projects - The projects to be set.
   */
  setProjects(state, projects) {
    state.projects = projects;
  },

  // ! ********** USERS **********

  /**
   * ? SET USER
   * * Set a user in the state.
   * @param {Object} state - The state object.
   * @param {Array} user - The user to be set.
   */
  setUser(state, user) {
    state.user = user;
  },

  /**
   * ? SET USERS
   * * Sets the users in the state.
   * @param {Object} state - The state object.
   * @param {Array} users - The users to be set.
   */
  setUsers(state, users) {
    state.users = users;
  }
};

export default mutations;
