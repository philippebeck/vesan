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
            <FieldElt id="name" v-model:value="name" @keyup.enter="createGallery()" :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt
              id="author"
              type="author"
              v-model:value="author"
              @keyup.enter="createGallery()"
              :info="val.INFO_AUTHOR"
              :min="val.URL_MIN"
              :max="val.URL_MAX"
            >
              <template #legend>{{ val.LEGEND_AUTHOR }}</template>
              <template #label>{{ val.LABEL_AUTHOR }}</template>
            </FieldElt>
          </template>
        </ListElt>

        <BtnElt
          type="button"
          @click="createGallery()"
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_GALLERY"
        >
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <form v-if="galleries.length > 0">
        <TableElt :items="galleries">
          <template #head>{{ val.HEAD_UP }}</template>

          <template #cell-id="slotProps">
            <BtnElt :content="slotProps.item.id" :href="`/gallery/${slotProps.item.id}`" />
          </template>

          <template #cell-name="slotProps">
            <FieldElt
              :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_NAME"
            >
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-author="slotProps">
            <FieldElt
              :id="`author-${slotProps.item.id}`"
              v-model:value="slotProps.item.author"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_NAME"
            >
              <template #legend>{{ val.LEGEND_AUTHOR }}</template>
              <template #label>{{ val.LABEL_AUTHOR }}</template>
            </FieldElt>
          </template>

          <template #cell-cover="slotProps">
            <FieldElt
              :id="`cover-${slotProps.item.id}`"
              type="select"
              :list="getImages"
              v-model:value="slotProps.item.cover"
              :content="slotProps.item.cover"
              @keyup.enter="updateGallery(slotProps.item.id)"
              :info="val.INFO_UP_COVER"
            >
              <template #legend>{{ val.LEGEND_COVER }}</template>
              <template #label>{{ val.LABEL_COVER }}</template>
            </FieldElt>
          </template>

          <template #body="slotProps">
            <BtnElt
              type="button"
              @click="updateGallery(slotProps.item.id)"
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.name"
            >
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
            <BtnElt
              type="button"
              @click="deleteGallery(slotProps.item.id)"
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.name"
            >
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

<script lang="ts">
import { defineComponent } from 'vue'
import { checkRange, deleteData, getItemName, postData, putData, setError } from '../assets/services'

import BtnElt from './BtnElt.vue'
import CardElt from './CardElt.vue'
import FieldElt from './FieldElt.vue'
import ListElt from './ListElt.vue'
import TableElt from './TableElt.vue'

interface Gallery {
  id: number
  name: string
  author: string
  cover: string
}

interface Val {
  ALERT_CREATED: string
  ALERT_DELETED: string
  ALERT_UPDATED: string
  API_URL: string
  CHECK_STRING: string
  TITLE_DELETE: string
}

export default defineComponent({
  name: 'GallerySet',
  components: { BtnElt, CardElt, FieldElt, ListElt, TableElt },
  props: ['galleries', 'images', 'token', 'val'],

  data() {
    return {
      name: '',
      author: ''
    } as Gallery
  },

  computed: {
    /**
     * ? GET IMAGES
     * * Retrieves the images & transforms them into an array of objects.
     * @return {Array<{content: string, value: number}>} An array of objects with the content & value properties.
     */
    getImages(): { content: string; value: number }[] {
      const images: { content: string; value: number }[] = []

      for (let i: number = 0; i < this.images.length; i++) {
        images.push({
          content: this.images[i].name,
          value: this.images[i].id
        })
      }

      return images
    }
  },

  methods: {
    /**
     * ? CREATE GALLERY
     * * Creates a gallery by sending a POST request to the server.
     *
     * @returns {Promise<void>} A promise that resolves when the gallery is created.
     */
    async createGallery(): Promise<void> {
      const { ALERT_CREATED, API_URL, CHECK_STRING }: Val = this.val

      const IS_NAME_CHECKED: boolean = checkRange(this.name, CHECK_STRING)
      const IS_AUTHOR_CHECKED: boolean = checkRange(this.author, CHECK_STRING)

      if (IS_NAME_CHECKED && IS_AUTHOR_CHECKED) {
        const URL: string = `${API_URL}/galleries`
        const data: FormData = new FormData()

        data.append('name', this.name)
        data.append('author', this.author)

        try {
          await postData(URL, data, this.token)
          alert(this.name + ALERT_CREATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    },

    /**
     * ? UPDATE GALLERY
     * * Update the gallery with the given ID.
     *
     * @param {number} id - The ID of the gallery to update.
     * @returns {Promise<void>} A promise that resolves when the gallery is updated.
     */
    async updateGallery(id: number): Promise<void> {
      const { CHECK_STRING, API_URL, ALERT_UPDATED }: Val = this.val

      const gallery: { id: number; name: string; author: string; cover: string } = this.galleries.find(
        (g: { id: number }) => g.id === id
      )
      let { name, author, cover }: Gallery = gallery

      const IS_NAME_CHECKED: boolean = gallery && checkRange(name, CHECK_STRING)
      const IS_AUTHOR_CHECKED: boolean = gallery && checkRange(author, CHECK_STRING)

      if (IS_NAME_CHECKED && IS_AUTHOR_CHECKED) {
        const URL: string = `${API_URL}/galleries/${id}`
        const data: FormData = new FormData()

        data.append('name', name)
        data.append('author', author)
        data.append('cover', cover)

        try {
          await putData(URL, data, this.token)
          alert(name + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        }
      }
    },

    /**
     * ? DELETE GALLERY
     * * Deletes a gallery with the specified ID.
     *
     * @param {number} id - The ID of the gallery to be deleted.
     * @returns {Promise<void>}
     */
    async deleteGallery(id: number): Promise<void> {
      const { ALERT_DELETED, API_URL, TITLE_DELETE }: Val = this.val

      const NAME: string | false = getItemName(id, this.galleries)

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL: string = `${API_URL}/galleries/${id}`

        try {
          await deleteData(URL, this.token)
          alert(NAME + ALERT_DELETED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    }
  }
})
</script>
