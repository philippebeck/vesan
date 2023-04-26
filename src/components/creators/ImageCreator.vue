<template>
  <CardElt>
  <template #header>
    <h2 id="create-image">
      <i class="fa-regular fa-image fa-lg"
        aria-hidden="true">
      </i>
      {{ constants.IMAGE_CREATOR }}
    </h2>
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
            :info="constants.INFO_DESCRIPTION"
            :max="constants.TEXT_MAX">

            <template #legend>
              {{ constants.LEGEND_DESCRIPTION }}
            </template>
            <template #label>
              {{ constants.LABEL_DESCRIPTION }}
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

  props: ["constants"],
  data() {
    return {
      description: "",
      gallery: ""
    }
  },

  methods: {
    /**
     * CREATE IMAGE
     */
    createImage() {
      if (this.$serve.checkString(this.description, this.constants.STRING_MIN, this.constants.TEXT_MAX)) {
        let image = document.getElementById("image").files[0];

        if (image !== undefined) {
          let data = new FormData();

          data.append("image", image);
          data.append("description", this.description);
          data.append("gallery", this.$route.params.id);

          this.$serve.fetchPost("/images", data)
            .then(() => {
              alert(image + this.constants.ALERT_CREATED);
              this.$router.go();
            })
            .catch(err => { this.$serve.checkError(err) });

        } else {
          alert(this.constants.ALERT_IMG);
        }
      }
    }
  }
}
</script>
