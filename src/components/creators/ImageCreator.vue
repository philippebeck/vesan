<template>
  <CardElt>
  <template #header>
    <h3 id="create-image">
      <i class="fa-regular fa-image fa-lg"
        aria-hidden="true">
      </i>
      {{ constants.IMAGE_CREATOR }}
    </h3>
  </template>

  <template #body>
    <form enctype="multipart/form-data">
      <ListElt :items="constants.IMAGE_FORM">

        <template #item-1>
          <FieldElt id="image" 
            type="file"
            v-model:value="image"
            :info="constants.INFO_IMAGE">

            <template #legend>
              {{ constants.LEGEND_IMAGE }}
            </template>
            <template #label>
              {{ constants.LABEL_IMAGE }}
            </template>
          </FieldElt>
        </template>

        <template #item-2>
          <FieldElt v-model:value="description"
            @keyup.enter="createImage()"
            :info="constants.INFO_DESCRIPTION">

            <template #legend>
              {{ constants.LEGEND_DESCRIPTION }}
            </template>
            <template #label>
              {{ constants.LABEL_DESCRIPTION }}
            </template>
          </FieldElt>
        </template>
        
        <template #item-3>
          <FieldElt type="select"
            :list="getGalleries"
            v-model:value="gallery"
            @keyup.enter="createImage()"
            :info="constants.INFO_GALLERY">

            <template #legend>
              {{ constants.LEGEND_GALLERY }}
            </template>
            <template #label>
              {{ constants.LABEL_GALLERY }}
            </template>
          </FieldElt>
        </template>
      </ListElt>

      <BtnElt type="button"
        @click="createImage()" 
        class="btn-green"
        :content="constants.CONTENT_CREATE"
        :title="constants.IMAGE_CREATOR">

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
  name: "ImageCreator",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt
  },

  props: ["constants", "galleries"],
  data() {
    return {
      description: "",
      gallery: ""
    }
  },

  computed: {
    /**
     * GET GALLERIES
     * @returns
     */
    getGalleries() {
      const galleries = new Set();

      for (let gallery of this.galleries) {
        galleries.add(gallery.name)
      }

      return Array.from(galleries); 
    }
  },  

  methods: {
    /**
     * CREATE IMAGE
     */
    createImage() {
      if (this.$serve.checkString(this.description)) {
        let img = document.getElementById("image").files[0];

        if (img !== undefined) {
          if (this.gallery !== "") { 
            let image = new FormData();

            image.append("image", img);
            image.append("description", this.description);
            image.append("gallery", this.gallery);

            this.$serve.postData("/images", image)
              .then(() => {
                alert(this.name + this.constants.ALERT_CREATED);
                this.$router.go();
              })
              .catch(err => { this.$serve.checkError(err) });

          } else {
          alert(this.constants.ALERT_GALLERY);
          }

        } else {
          alert(this.constants.ALERT_IMG);
        }
      }
    }
  }
}
</script>
