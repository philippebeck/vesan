module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      axios: { src: ["public/js/axios.js"], dest: "src/assets/axios.js" },
      serve: { src: ["node_modules/servidio/dist/serve.js"], dest: "src/assets/serve.js" },
      media: { src: ["node_modules/vue-elt/src/lib-components/MediaElt.vue"], dest: "src/assets/MediaElt.vue" },
      field: { src: ["node_modules/vue-elt/src/lib-components/FieldElt.vue"], dest: "src/assets/FieldElt.vue" },
      btn: { src: ["node_modules/vue-elt/src/lib-components/BtnElt.vue"], dest: "src/assets/BtnElt.vue" },
      slider: { src: ["node_modules/vue-elt/src/lib-components/SliderElt.vue"], dest: "src/assets/SliderElt.vue" },
      list: { src: ["node_modules/vue-elt/src/lib-components/ListElt.vue"], dest: "src/assets/ListElt.vue"},
      table: { src: ["node_modules/vue-elt/src/lib-components/TableElt.vue"], dest: "src/assets/TableElt.vue" },
      nav: { src: ["node_modules/vue-elt/src/lib-components/NavElt.vue"], dest: "src/assets/NavElt.vue" },
      card: { src: ["node_modules/vue-elt/src/lib-components/CardElt.vue"], dest: "src/assets/CardElt.vue" },
      foot: { src: ["node_modules/vue-elt/src/lib-components/FootElt.vue"], dest: "src/assets/FootElt.vue" },
      css: { 
        src: ["public/css/import.css", "node_modules/vue-elt/dist/style.css", "public/css/overload.css"], 
        dest: "public/css/style.ui.css"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
