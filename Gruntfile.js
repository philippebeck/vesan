module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      serve: { src: ["node_modules/servidio/dist/serve.js"], dest: "src/assets/serve.js" },

      style: { src: ["public/css/import.css", "public/css/overload.css"], dest: "public/css/style.css" },
      var: { src: ["node_modules/vue-elt/dist/style.css"], dest: "public/css/var.css" },

      forgotPass: { src: ["node_modules/vue-elt/src/lib-components/auth/ForgotPass.vue"], dest: "src/assets/auth/ForgotPass.vue" },
      signIn: { src: ["node_modules/vue-elt/src/lib-components/auth/SignIn.vue"], dest: "src/assets/auth/SignIn.vue" },
      signUp: { src: ["node_modules/vue-elt/src/lib-components/auth/SignUp.vue"], dest: "src/assets/auth/SignUp.vue" },

      articleCreator: { src: ["node_modules/vue-elt/src/lib-components/creators/ArticleCreator.vue"], dest: "src/assets/creators/ArticleCreator.vue" },
      galleryCreator: { src: ["node_modules/vue-elt/src/lib-components/creators/GalleryCreator.vue"], dest: "src/assets/creators/GalleryCreator.vue" },
      imageCreator: { src: ["node_modules/vue-elt/src/lib-components/creators/ImageCreator.vue"], dest: "src/assets/creators/ImageCreator.vue" },
      linkCreator: { src: ["node_modules/vue-elt/src/lib-components/creators/LinkCreator.vue"], dest: "src/assets/creators/LinkCreator.vue" },
      productCreator: { src: ["node_modules/vue-elt/src/lib-components/creators/ProductCreator.vue"], dest: "src/assets/creators/ProductCreator.vue" },

      articleManager: { src: ["node_modules/vue-elt/src/lib-components/managers/ArticleManager.vue"], dest: "src/assets/managers/ArticleManager.vue" },
      galleryManager: { src: ["node_modules/vue-elt/src/lib-components/managers/GalleryManager.vue"], dest: "src/assets/managers/GalleryManager.vue" },
      imageManager: { src: ["node_modules/vue-elt/src/lib-components/managers/ImageManager.vue"], dest: "src/assets/managers/ImageManager.vue" },
      linkManager: { src: ["node_modules/vue-elt/src/lib-components/managers/LinkManager.vue"], dest: "src/assets/managers/LinkManager.vue" },
      orderManager: { src: ["node_modules/vue-elt/src/lib-components/managers/OrderManager.vue"], dest: "src/assets/managers/OrderManager.vue" },
      productManager: { src: ["node_modules/vue-elt/src/lib-components/managers/ProductManager.vue"], dest: "src/assets/managers/ProductManager.vue" },
      userManager: { src: ["node_modules/vue-elt/src/lib-components/managers/UserManager.vue"], dest: "src/assets/managers/UserManager.vue" },

      media: { src: ["node_modules/vue-elt/src/lib-components/elements/MediaElt.vue"], dest: "src/assets/elements/MediaElt.vue" },
      field: { src: ["node_modules/vue-elt/src/lib-components/elements/FieldElt.vue"], dest: "src/assets/elements/FieldElt.vue" },
      btn: { src: ["node_modules/vue-elt/src/lib-components/elements/BtnElt.vue"], dest: "src/assets/elements/BtnElt.vue" },
      slider: { src: ["node_modules/vue-elt/src/lib-components/elements/SliderElt.vue"], dest: "src/assets/elements/SliderElt.vue" },
      list: { src: ["node_modules/vue-elt/src/lib-components/elements/ListElt.vue"], dest: "src/assets/elements/ListElt.vue"},
      table: { src: ["node_modules/vue-elt/src/lib-components/elements/TableElt.vue"], dest: "src/assets/elements/TableElt.vue" },
      nav: { src: ["node_modules/vue-elt/src/lib-components/elements/NavElt.vue"], dest: "src/assets/elements/NavElt.vue" },
      card: { src: ["node_modules/vue-elt/src/lib-components/elements/CardElt.vue"], dest: "src/assets/elements/CardElt.vue" },
      foot: { src: ["node_modules/vue-elt/src/lib-components/elements/FootElt.vue"], dest: "src/assets/elements/FootElt.vue" },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
