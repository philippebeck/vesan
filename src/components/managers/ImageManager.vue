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
        <TableElt v-for="table in getItemsByGallery(images)"
          :items="table"
          :key="table"
          :title="table[0].gallery"
          :id="table[0].gallery">

          <template #title>
            <h3 class="sky">{{ table[0].gallery.split('-')[1] }}</h3>
          </template>

          <template #head>{{ constants.HEAD_UP }}</template>

          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ table[slotProps.index]._id }})
          </template>

          <template #cell-name="slotProps">
            <MediaElt :src="'/img/thumbnails/galleries/' + table[slotProps.index].name"
              :alt="table[slotProps.index].description"
              :title="table[slotProps.index].name"/>

            <FieldElt :id="images[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <template #cell-description="slotProps">
            <FieldElt v-model:value="table[slotProps.index].description"
              @keyup.enter="updateImage(table[slotProps.index]._id)"
              :info="constants.INFO_UP_DESCRIPTION"/>
          </template>

          <template #cell-gallery="slotProps">
            <FieldElt type="select"
              :list="getGalleries"
              v-model:value="table[slotProps.index].gallery"
              :content="table[slotProps.index].gallery.split('-')[1]"
              @keyup.enter="updateImage(table[slotProps.index]._id)"
              :info="constants.INFO_UP_GALLERY"/>
          </template>

          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateImage(table[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_IMAGE_UPDATE + table[slotProps.index]._id">

              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteImage(table[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE_IMAGE + table[slotProps.index]._id">

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
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "ImageManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: [
    "galleries", 
    "images", 
    "constants"
  ],

  computed: {
    /**
     * GET GALLERIES
     * @returns
     */
    getGalleries() {
      const galleries = [];

      for (let i = 0; i < this.galleries.length; i++) {
        galleries.push({
          content: this.galleries[i].name,
          value: this.galleries[i]._id
        })
      }

      return galleries; 
    }
  },

  methods: {
    /**
     * GET ALL IMAGES
     * @returns
     */
    getImages() {
      return this.images;
    },

    /**
     * SORT ITEMS BY GALLERY
     * @param {array} items 
     */
    getItemsByGallery(items) {
      const itemsByGallery = {};

      for (let item of items) {

        if (!itemsByGallery[item.gallery]) {
          itemsByGallery[item.gallery] = [];
        }

        itemsByGallery[item.gallery].push(item);
        itemsByGallery[item.gallery].sort((a, b) => (a.name > b.name) ? 1 : -1);
      }

      return itemsByGallery;
    },

    /**
     * UPDATE IMAGE
     * @param {string} id 
     */
    updateImage(id) {
      for (let image of this.images) {
        if (image._id === id) {

          let data = new FormData();
          let img = document.getElementById(id).files[0] ?? image.name;

          data.append("name", image.name);
          data.append("image", img);
          data.append("description", image.description);
          data.append("gallery", image.gallery.split('-')[0]);

          let url = this.constants.API_URL + "/images/" + id;
          let options = {
            method: "PUT",
            mode: "cors",
            headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
            body: data
          };

          this.$serve.fetchSet(url, options)
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

        let url = this.constants.API_URL + "/images/" + id;
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` }
        };

        this.$serve.fetchSet(url, options)
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
