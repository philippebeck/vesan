<template>
  <CardElt>
    <template #header>
      <h2 id="image">
        <i class="fa-regular fa-images fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.IMAGE_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <TableElt :items="images">
          <template #head>up/del</template>

          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ images[slotProps.index]._id }})
          </template>

          <template #cell-name="slotProps">
            <MediaElt :src="'/img/thumbnails/galleries/' + images[slotProps.index].name"
              :alt="images[slotProps.index].alt"
              :title="images[slotProps.index].name"/>

            <FieldElt :id="images[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <template #cell-description="slotProps">
            <FieldElt v-model:value="getImages()[slotProps.index].description"
              @keyup.enter="updateImage(images[slotProps.index]._id)"
              :info="constants.INFO_UP_DESCRIPTION"/>
          </template>

          <template #cell-gallery="slotProps">
            <FieldElt type="select"
              :list="getGalleries"
              v-model:value="getImages()[slotProps.index].gallery"
              @keyup.enter="updateImage(images[slotProps.index]._id)"
              :info="constants.INFO_UP_GALLERY"/>
          </template>

          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateImage(images[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_IMAGE_UPDATE + images[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteImage(images[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_IMAGE + images[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "ImageManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "galleries", 
    "images", 
    "constants"
  ],

  methods: {
    /**
     * GET ALL IMAGES
     * @returns
     */
    getImages() {
      return this.images;
    },

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
    },

    /**
     * UPDATE IMAGE
     * @param {string} id 
     */
    updateImage(id) {
      for (let image of this.images) {
        if (image._id === id) {

          let data = new FormData();
          data.append("text", image.text);
          data.append("moderate", image.moderate);

          this.$serve.putData(`/images/${id}`, data)
            .then(() => {
              alert(this.constants.ALERT_IMAGE + id + this.constants.ALERT_UPDATED);
            })
            .catch(err => { this.$serve.checkError(err) });
        }
      }
    },

    /**
     * DELETE IMAGE
     * @param {string} id 
     */
    deleteImage(id) {
      if (confirm(`${this.constants.TITLE_DELETE_IMAGE}${id} ?`) === true) {
        this.$serve.deleteData(`/images/${id}`)
          .then(() => {
            alert(this.constants.ALERT_IMAGE + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
