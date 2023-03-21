module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      media: { src: ["node_modules/vue-elt/src/lib-components/base/MediaElt.vue"], dest: "src/assets/MediaElt.vue" },
      field: { src: ["node_modules/vue-elt/src/lib-components/base/FieldElt.vue"], dest: "src/assets/FieldElt.vue" },
      btn: { src: ["node_modules/vue-elt/src/lib-components/base/BtnElt.vue"], dest: "src/assets/BtnElt.vue" },
      slider: { src: ["node_modules/vue-elt/src/lib-components/data/SliderElt.vue"], dest: "src/assets/SliderElt.vue" },
      list: { src: ["node_modules/vue-elt/src/lib-components/data/ListElt.vue"], dest: "src/assets/ListElt.vue"},
      table: { src: ["node_modules/vue-elt/src/lib-components/data/TableElt.vue"], dest: "src/assets/TableElt.vue" },
      nav: { src: ["node_modules/vue-elt/src/lib-components/main/NavElt.vue"], dest: "src/assets/NavElt.vue" },
      card: { src: ["node_modules/vue-elt/src/lib-components/main/CardElt.vue"], dest: "src/assets/CardElt.vue" },
      foot: { src: ["node_modules/vue-elt/src/lib-components/main/FootElt.vue"], dest: "src/assets/FootElt.vue" },
      css: { 
        src: ["public/css/import.css", "node_modules/vue-elt/dist/style.css", "public/css/overload.css"], 
        dest: "public/css/style.ui.css"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
