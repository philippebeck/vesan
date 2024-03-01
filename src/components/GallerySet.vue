<template>
  <CardElt id="gallery-set">
    <template #header>
      <h2>
        <i class="fa-solid fa-images fa-lg"></i>
        {{ val.GALLERY_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <ListElt :items="val.GALLERY_FORM">

          <template #item-1>
            <FieldElt id="name"
              v-model:value="name"
              @keyup.enter="createGallery()"
              :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt id="author"
              type="author"
              v-model:value="author"
              @keyup.enter="createGallery()"
              :info="val.INFO_AUTHOR"
              :min="val.URL_MIN"
              :max="val.URL_MAX">
              <template #legend>{{ val.LEGEND_AUTHOR }}</template>
              <template #label>{{ val.LABEL_AUTHOR }}</template>
            </FieldElt>
          </template>
        </ListElt>

        <BtnElt type="button"
          @click="createGallery()" 
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_GALLERY">
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <form v-if="galleries.length > 0">
        <TableElt :items="galleries">
          <template #head>{{ val.HEAD_UP }}</template>

          <template #cell-id="slotProps">
            <BtnElt :content="slotProps.item.id"
              :href="`/gallery/${slotProps.item.id}`"/>
          </template>

          <template #cell-name="slotProps">
            <FieldElt :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-author="slotProps">
            <FieldElt :id="`author-${slotProps.item.id}`"
              v-model:value="slotProps.item.author"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_NAME">
              <template #legend>{{ val.LEGEND_AUTHOR }}</template>
              <template #label>{{ val.LABEL_AUTHOR }}</template>
            </FieldElt>
          </template>

          <template #cell-cover="slotProps">
            <FieldElt :id="`cover-${slotProps.item.id}`"
              type="select"
              :list="getImages"
              v-model:value="slotProps.item.cover"
              :content="slotProps.item.cover"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_COVER">
              <template #legend>{{ val.LEGEND_COVER }}</template>
              <template #label>{{ val.LABEL_COVER }}</template>
            </FieldElt>
          </template>

          <template #body="slotProps">
            <BtnElt type="button"
              @click="updateGallery(slotProps.item.id)" 
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.name">
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
            <BtnElt type="button"
              @click="deleteGallery(slotProps.item.id)" 
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.name">
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
import BtnElt from "./BtnElt"
import CardElt from "./CardElt"
import FieldElt from "./FieldElt"
import ListElt from "./ListElt"
import TableElt from "./TableElt"

import { checkRange, deleteData, getItemName, postData, putData, setError } from "../app/services"

export default {
  name: "GallerySet",
  components: { BtnElt, CardElt, FieldElt, ListElt, TableElt },
  props: ["galleries", "images", "token", "val"],
  data() {
    return {
      name: "",
      author: ""
    }
  },

  computed: {
    /**
     * ? GET IMAGES
     * * Retrieves the images & transforms them into an array of objects.
     * @return {Array} An array of objects with the content & value properties.
     */
    getImages() {
      const images = [];

      for (let i = 0; i < this.images.length; i++) {
        images.push({
          content: this.images[i].name,
          value: this.images[i].id
        })
      }

      return images; 
    }
  },

  methods: {
    /**
     * ? CREATE GALLERY
     * * Creates a galleryby sending a POST request to the server.
     */
    createGallery() {
      const { ALERT_CREATED, API_URL, CHECK_STRING } = this.val;

      const IS_NAME_CHECKED   = checkRange(this.name, CHECK_STRING);
      const IS_AUTHOR_CHECKED = checkRange(this.author, CHECK_STRING);

      if (IS_NAME_CHECKED && IS_AUTHOR_CHECKED) {
        const URL   = `${API_URL}/galleries`;
        const data  = new FormData();

        data.append("name", this.name);
        data.append("author", this.author);

        postData(URL, data, this.token)
          .then(() => {
            alert(this.name + ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    },

    /**
     * ? UPDATE GALLERY
     * * Update the gallery with the given ID.
     * @param {number} id - The ID of the gallery to update.
     */
    updateGallery(id) {
      const { CHECK_STRING, API_URL, ALERT_UPDATED } = this.val;

      const gallery = this.galleries.find(g => g.id === id);
      let { name, author, cover } = gallery;

      const IS_NAME_CHECKED   = gallery && checkRange(name, CHECK_STRING);
      const IS_AUTHOR_CHECKED = gallery && checkRange(author, CHECK_STRING);

      if (IS_NAME_CHECKED && IS_AUTHOR_CHECKED) {
        const URL   = `${API_URL}/galleries/${id}`;
        const data  = new FormData();

        data.append("name", name);
        data.append("author", author);
        data.append("cover", cover);

        putData(URL, data, this.token)
          .then(() => alert(name + ALERT_UPDATED))
          .catch(err => setError(err));
      }
    },

    /**
     * ? DELETE GALLERY
     * * Deletes a gallery with the specified ID.
     * @param {number} id - The ID of the gallery to be deleted.
     */
    deleteGallery(id) {
      const { TITLE_DELETE, API_URL, ALERT_DELETED } = this.val;
      const NAME = getItemName(id, this.galleries);

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL = `${API_URL}/galleries/${id}`

        deleteData(URL, this.token)
          .then(() => {
            alert(NAME + ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    }
  }
}
</script>
