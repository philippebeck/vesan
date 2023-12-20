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

      articleSet: { src: ["node_modules/vue-elt/components/setters/ArticleSet.vue"], dest: "src/assets/setters/ArticleSet.vue" },
      gallerySet: { src: ["node_modules/vue-elt/components/setters/GallerySet.vue"], dest: "src/assets/setters/GallerySet.vue" },
      imageSet: { src: ["node_modules/vue-elt/components/setters/ImageSet.vue"], dest: "src/assets/setters/ImageSet.vue" },
      linkSet: { src: ["node_modules/vue-elt/components/setters/LinkSet.vue"], dest: "src/assets/setters/LinkSet.vue" },
      orderSet: { src: ["node_modules/vue-elt/components/setters/OrderSet.vue"], dest: "src/assets/setters/OrderSet.vue" },
      productSet: { src: ["node_modules/vue-elt/components/setters/ProductSet.vue"], dest: "src/assets/setters/ProductSet.vue" },
      userSet: { src: ["node_modules/vue-elt/components/setters/UserSet.vue"], dest: "src/assets/setters/UserSet.vue" },

      values: { src: ["node_modules/vue-elt/config/values.example.js"], dest: "src/config/values.compile.js" }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
