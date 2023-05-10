<template>
  <CardElt>
    <template #header>
      <h2 id="gallery">
        <i class="fa-regular fa-images fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.GALLERY_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <TableElt :items="galleries">
          <template #head>{{ constants.HEAD_UP }}</template>

          <template #cell-_id="slotProps">
            <a :href="`/gallery/${galleries[slotProps.index]._id}`">
              <b>#{{ slotProps.index + 1 }}</b>
              ({{ galleries[slotProps.index]._id }})
            </a>
          </template>

          <template #cell-name="slotProps">
            <FieldElt v-model:value="getGalleries()[slotProps.index].name"
              @keyup.enter="updateGallery(galleries[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <template #cell-author="slotProps">
            <FieldElt v-model:value="getGalleries()[slotProps.index].author"
              @keyup.enter="updateGallery(galleries[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateGallery(galleries[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_GALLERY_UPDATE + galleries[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteGallery(galleries[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_GALLERY + galleries[slotProps.index]._id">

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
import { checkError, fetchSet } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import TableElt from "../assets/TableElt"

export default {
  name: "GalleryManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    TableElt
  },

  props: [
    "galleries", 
    "constants"
  ],

  methods: {
    /**
     * GET ALL GALLERYS
     * @returns
     */
    getGalleries() {
      return this.galleries;
    },

    /**
     * UPDATE GALLERY
     * @param {string} id 
     */
    updateGallery(id) {
      for (let gallery of this.galleries) {
        if (gallery._id === id) {

          let data = new FormData();
          data.append("text", gallery.text);
          data.append("moderate", gallery.moderate);

          let url     = this.constants.API_URL + "/galleries/" + id;
          let options = {
            method: "PUT",
            mode: "cors",
            headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
            body: data
          };

          fetchSet(url, options)
            .then(() => {
              alert(this.constants.ALERT_GALLERY + id + this.constants.ALERT_UPDATED);
            })
            .catch(err => { checkError(err) });
        }
      }
    },

    /**
     * DELETE GALLERY
     * @param {string} id 
     */
    deleteGallery(id) {
      if (confirm(`${this.constants.TITLE_DELETE_GALLERY}${id} ?`) === true) {

        let url     = this.constants.API_URL + "/galleries/" + id;
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` }
        };

        fetchSet(url, options)
          .then(() => {
            alert(this.constants.ALERT_GALLERY + id + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { checkError(err) });
      }
    }
  }
}
</script>
