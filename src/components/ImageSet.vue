<template>
  <CardElt id="image-set">
    <template #header>
      <h2>
        <i class="fa-solid fa-image fa-lg"></i>
        {{ val.IMAGE_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <ListElt :items="val.IMAGE_FORM">
          <template #item-1>
            <FieldElt id="image" type="file" v-model:value="image" :info="val.INFO_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt
              id="description"
              v-model:value="description"
              @keyup.enter="createImage()"
              :info="val.INFO_DESCRIPTION"
              :max="val.TEXT_MAX"
            >
              <template #legend>{{ val.LEGEND_DESCRIPTION }}</template>
              <template #label>{{ val.LABEL_DESCRIPTION }}</template>
            </FieldElt>
          </template>
        </ListElt>

        <BtnElt
          type="button"
          @click="createImage()"
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_IMAGE"
        >
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <form v-if="images.length > 0">
        <TableElt :items="images">
          <template #head>{{ val.HEAD_UP }}</template>

          <template #cell-id="slotProps">
            <BtnElt
              :content="slotProps.item.id"
              :href="`${val.UI_URL}/img/galleries/${slotProps.item.name}`"
              :title="slotProps.item.description"
              target="_blank"
              rel="noopener noreferrer"
            />
          </template>

          <template #cell-name="slotProps">
            <MediaElt
              :src="'/img/thumbnails/galleries/' + slotProps.item.name"
              :alt="slotProps.item.description"
              :title="slotProps.item.name"
              loading="lazy"
            />

            <FieldElt :id="`image-${slotProps.item.id}`" type="file" :info="val.INFO_UP_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #cell-description="slotProps">
            <FieldElt
              :id="`description-${slotProps.item.id}`"
              type="textarea"
              v-model:value="slotProps.item.description"
              @keyup.enter="updateImage(slotProps.item.id)"
              :info="val.INFO_UP_DESCRIPTION"
            >
              <template #legend>{{ val.LEGEND_DESCRIPTION }}</template>
              <template #label>{{ val.LABEL_DESCRIPTION }}</template>
            </FieldElt>
          </template>

          <template #cell-Gallery="slotProps">
            <FieldElt
              :id="`gallery-${slotProps.item.id}`"
              type="select"
              :list="getGalleries"
              v-model:value="slotProps.item.Gallery.name"
              :content="slotProps.item.Gallery.name"
              @keyup.enter="updateImage(slotProps.item.id)"
              :info="val.INFO_UP_GALLERY"
            >
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #body="slotProps">
            <BtnElt
              type="button"
              @click="updateImage(slotProps.item.id)"
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.description"
            >
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>

            <BtnElt
              type="button"
              @click="deleteImage(slotProps.item.id)"
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.description"
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
import BtnElt from './BtnElt.vue'
import CardElt from './CardElt.vue'
import FieldElt from './FieldElt.vue'
import ListElt from './ListElt.vue'
import MediaElt from './MediaElt.vue'
import TableElt from './TableElt.vue'

import { checkRange, deleteData, putData, postData, setError } from '../assets/services'

export default {
  name: 'ImageSet',
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, TableElt },

  props: ['galleries', 'images', 'token', 'val'],
  data() {
    return {
      description: '',
      gallery: ''
    }
  },

  computed: {
    /**
     * ? GET GALLERIES
     * * Retrieves the galleries & transforms them into an array of objects.
     *
     * @return {Array<{content: string, value: number}>} An array of objects with the content & value properties.
     */
    getGalleries(): Array<{ content: string; value: number }> {
      const galleries: Array<{ content: string; value: number }> = []

      for (let i = 0; i < this.galleries.length; i++) {
        galleries.push({
          content: this.galleries[i].name,
          value: this.galleries[i].id
        })
      }

      return galleries
    }
  },

  methods: {
    /**
     * ? CREATE IMAGE
     * * Create an image by sending a POST request to the server.
     *
     * @param {string} description - The description of the image
     * @param {object} val - The object containing CHECK_STRING, API_URL, ALERT_CREATED, and ALERT_IMG
     * @param {string} token - The authentication token
     * @returns {Promise<void>}
     */
    async createImage(description, val, token) {
      const { CHECK_STRING, API_URL, ALERT_CREATED, ALERT_IMG } = val

      if (checkRange(description, CHECK_STRING)) {
        const img = document.getElementById('image')?.files[0]

        if (img !== undefined) {
          const URL = API_URL + '/images'
          const data = new FormData()

          data.append('image', img)
          data.append('description', description)
          data.append('galleryId', this.$route.params.id)

          try {
            await postData(URL, data, token)
            alert(description + ALERT_CREATED)
          } catch (err) {
            setError(err)
          } finally {
            this.$router.go()
          }
        } else {
          alert(ALERT_IMG)
        }
      }
    },

    /**
     * ? UPDATE IMAGE
     * * Updates an image.
     *
     * @param {number} id - The ID of the image to be updated.
     * @returns {Promise<void>}
     */
    async updateImage(id: number): Promise<void> {
      const {
        ALERT_IMAGE,
        ALERT_UPDATED,
        API_URL,
        CHECK_STRING
      }: {
        ALERT_IMAGE: string
        ALERT_UPDATED: string
        API_URL: string
        CHECK_STRING: string
      } = this.val

      const image: any = this.images.find((i: any) => i.id === id)
      let { name, description, galleryId } = image

      const IS_NAME_CHECKED: boolean = image && checkRange(name, CHECK_STRING)
      const IS_DESC_CHECKED: boolean = image && checkRange(description, CHECK_STRING)

      if (IS_NAME_CHECKED && IS_DESC_CHECKED) {
        const URL: string = `${API_URL}/images/${id}`
        const img: any = document.getElementById(`image-${id}`)?.files[0] ?? name
        const data: FormData = new FormData()

        data.append('name', name)
        data.append('image', img)
        data.append('description', description)
        data.append('galleryId', galleryId)

        try {
          await putData(URL, data, this.token)
          alert(ALERT_IMAGE + id + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go()
        }
      }
    },

    /**
     * ? DELETE IMAGE
     * * Deletes an image from the server based on the provided ID.
     * @param {number} id - The ID of the image to be deleted.
     * @returns {Promise<void>}
     */
    async deleteImage(id: number): Promise<void> {
      const {
        TITLE_DELETE_IMAGE,
        API_URL,
        ALERT_IMAGE,
        ALERT_DELETED
      }: {
        TITLE_DELETE_IMAGE: string
        API_URL: string
        ALERT_IMAGE: string
        ALERT_DELETED: string
      } = this.val

      if (confirm(`${TITLE_DELETE_IMAGE} ${id} ?`)) {
        const URL: string = `${API_URL}/images/${id}`

        try {
          await deleteData(URL, this.token)
          alert(ALERT_IMAGE + id + ALERT_DELETED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go()
        }
      }
    }
  }
}
</script>
