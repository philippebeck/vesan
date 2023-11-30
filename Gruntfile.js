module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      btn: { src: ["node_modules/vue-elt/components/elements/BtnElt.vue"], dest: "src/assets/elements/BtnElt.vue" },
      card: { src: ["node_modules/vue-elt/components/elements/CardElt.vue"], dest: "src/assets/elements/CardElt.vue" },
      field: { src: ["node_modules/vue-elt/components/elements/FieldElt.vue"], dest: "src/assets/elements/FieldElt.vue" },
      foot: { src: ["node_modules/vue-elt/components/elements/FootElt.vue"], dest: "src/assets/elements/FootElt.vue" },
      list: { src: ["node_modules/vue-elt/components/elements/ListElt.vue"], dest: "src/assets/elements/ListElt.vue"},
      media: { src: ["node_modules/vue-elt/components/elements/MediaElt.vue"], dest: "src/assets/elements/MediaElt.vue" },
      nav: { src: ["node_modules/vue-elt/components/elements/NavElt.vue"], dest: "src/assets/elements/NavElt.vue" },
      slider: { src: ["node_modules/vue-elt/components/elements/SliderElt.vue"], dest: "src/assets/elements/SliderElt.vue" },
      table: { src: ["node_modules/vue-elt/components/elements/TableElt.vue"], dest: "src/assets/elements/TableElt.vue" },

      articleManager: { src: ["node_modules/vue-elt/components/managers/ArticleManager.vue"], dest: "src/assets/managers/ArticleManager.vue" },
      galleryManager: { src: ["node_modules/vue-elt/components/managers/GalleryManager.vue"], dest: "src/assets/managers/GalleryManager.vue" },
      imageManager: { src: ["node_modules/vue-elt/components/managers/ImageManager.vue"], dest: "src/assets/managers/ImageManager.vue" },
      linkManager: { src: ["node_modules/vue-elt/components/managers/LinkManager.vue"], dest: "src/assets/managers/LinkManager.vue" },
      orderManager: { src: ["node_modules/vue-elt/components/managers/OrderManager.vue"], dest: "src/assets/managers/OrderManager.vue" },
      productManager: { src: ["node_modules/vue-elt/components/managers/ProductManager.vue"], dest: "src/assets/managers/ProductManager.vue" },
      userManager: { src: ["node_modules/vue-elt/components/managers/UserManager.vue"], dest: "src/assets/managers/UserManager.vue" },

      articleCreator: { src: ["node_modules/vue-elt/components/creators/ArticleCreator.vue"], dest: "src/assets/creators/ArticleCreator.vue" },
      galleryCreator: { src: ["node_modules/vue-elt/components/creators/GalleryCreator.vue"], dest: "src/assets/creators/GalleryCreator.vue" },
      imageCreator: { src: ["node_modules/vue-elt/components/creators/ImageCreator.vue"], dest: "src/assets/creators/ImageCreator.vue" },
      linkCreator: { src: ["node_modules/vue-elt/components/creators/LinkCreator.vue"], dest: "src/assets/creators/LinkCreator.vue" },
      productCreator: { src: ["node_modules/vue-elt/components/creators/ProductCreator.vue"], dest: "src/assets/creators/ProductCreator.vue" },

      forgotPass: { src: ["node_modules/vue-elt/components/auth/ForgotPass.vue"], dest: "src/assets/auth/ForgotPass.vue" },
      signIn: { src: ["node_modules/vue-elt/components/auth/SignIn.vue"], dest: "src/assets/auth/SignIn.vue" },
      signUp: { src: ["node_modules/vue-elt/components/auth/SignUp.vue"], dest: "src/assets/auth/SignUp.vue" },

      css: { src: ["node_modules/vue-elt/dist/style.css"], dest: "public/css/var.css" },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
