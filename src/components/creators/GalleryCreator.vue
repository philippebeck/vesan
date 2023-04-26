<template>
  <CardElt>
  <template #header>
    <h2 id="create-gallery">
      <i class="fa-regular fa-images fa-lg"
        aria-hidden="true">
      </i>
      {{ constants.GALLERY_CREATOR }}
    </h2>
  </template>

  <template #body>
    <form>
      <ListElt :items="constants.GALLERY_FORM">

        <template #item-1>
          <FieldElt v-model:value="name"
            @keyup.enter="createGallery()"
            :info="constants.INFO_NAME">

            <template #legend>
              {{ constants.LEGEND_NAME }}
            </template>
            <template #label>
              {{ constants.LABEL_NAME }}
            </template>
          </FieldElt>
        </template>

        <template #item-2>
          <FieldElt type="author"
            v-model:value="author"
            @keyup.enter="createGallery()"
            :info="constants.INFO_AUTHOR"
            :min="constants.URL_MIN"
            :max="constants.URL_MAX">

            <template #legend>
              {{ constants.LEGEND_AUTHOR }}
            </template>
            <template #label>
              {{ constants.LABEL_AUTHOR }}
            </template>
          </FieldElt>
        </template>
      </ListElt>

      <BtnElt type="button"
        @click="createGallery()" 
        class="btn-green"
        :content="constants.CONTENT_CREATE"
        :title="constants.GALLERY_CREATOR">

        <template #btn>
          <i class="fa-solid fa-square-plus fa-lg"></i>
        </template>
      </BtnElt>
    </form>
  </template>
</CardElt>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"

export default {
name: "GalleryCreator",
components: {
  BtnElt,
  CardElt,
  FieldElt,
  ListElt
},

props: ["constants"],
data() {
  return {
    name: "",
    author: ""
  }
},

methods: {
  /**
   * CREATE GALLERY
   */
  createGallery() {
    if (this.$serve.checkString(this.name) && this.$serve.checkString(this.author)) {
      let gallery = new FormData();

      gallery.append("name", this.name);
      gallery.append("author", this.author);

      this.$serve.fetchPost("/galleries", gallery)
        .then(() => {
          alert(this.name + this.constants.ALERT_CREATED);
          this.$router.go();
        })
        .catch(err => { this.$serve.checkError(err) });
    }
  }
}
}
</script>
