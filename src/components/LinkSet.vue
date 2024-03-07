<template>
  <CardElt id="link-set">
    <template #header>
      <h2>
        <i class="fa-solid fa-list-check fa-lg"></i>
        {{ val.LINK_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form>
        <ListElt :items="val.LINK_FORM">
          <template #item-1>
            <FieldElt id="name" v-model:value="name" @keyup.enter="createLink()" :info="val.INFO_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt
              id="url"
              type="url"
              v-model:value="url"
              @keyup.enter="createLink()"
              :info="val.INFO_URL"
              :min="val.URL_MIN"
              :max="val.URL_MAX"
            >
              <template #legend>{{ val.LEGEND_URL }}</template>
              <template #label>{{ val.LABEL_URL }}</template>
            </FieldElt>
          </template>

          <template #item-3>
            <FieldElt
              id="cat"
              type="select"
              :list="val.CATS_LINK"
              v-model:value="cat"
              @keyup.enter="createLink()"
              :info="val.INFO_CAT"
            >
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>
        </ListElt>

        <BtnElt
          type="button"
          @click="createLink()"
          class="btn-green"
          :content="val.CONTENT_CREATE"
          :title="val.TITLE_LINK"
        >
          <template #btn>
            <i class="fa-solid fa-square-plus fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <form v-if="links.length > 0">
        <TableElt
          :title="table[0].cat"
          :items="table"
          v-for="table in getItemsByCategory(links)"
          :key="table"
          :id="table[0].cat"
        >
          <template #title>
            <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x blue-dark`"></i>
          </template>

          <template #head>{{ val.HEAD_UP }}</template>

          <template #cell-id="slotProps">
            <BtnElt
              :content="slotProps.item.id"
              :href="`https://${slotProps.item.url}`"
              :title="slotProps.item.name"
              target="_blank"
              rel="noopener noreferrer"
            />
          </template>

          <template #cell-name="slotProps">
            <FieldElt
              :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateLink(slotProps.item.id)"
              :info="val.INFO_UP_NAME"
              :label="val.INFO_UP_NAME"
            >
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-url="slotProps">
            <FieldElt
              :id="`url-${slotProps.item.id}`"
              type="url"
              v-model:value="slotProps.item.url"
              @keyup.enter="updateLink(slotProps.item.id)"
              :info="val.INFO_UP_URL"
              :label="val.INFO_UP_URL"
              :max="parseInt('100')"
            >
              <template #legend>{{ val.LEGEND_URL }}</template>
              <template #label>{{ val.LABEL_URL }}</template>
            </FieldElt>
          </template>

          <template #cell-cat="slotProps">
            <FieldElt
              :id="`cat-${slotProps.item.id}`"
              type="select"
              :list="val.CATS_LINK"
              v-model:value="slotProps.item.cat"
              @keyup.enter="updateLink(slotProps.item.id)"
              :info="val.INFO_UP_CAT"
              :label="val.INFO_UP_CAT"
            >
              <template #legend>{{ val.LEGEND_CAT }}</template>
              <template #label>{{ val.LABEL_CAT }}</template>
            </FieldElt>
          </template>

          <template #body="slotProps">
            <BtnElt
              type="button"
              @click="updateLink(slotProps.item.id)"
              class="btn-blue"
              :title="val.TITLE_UPDATE + slotProps.item.name"
            >
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
            <BtnElt
              type="button"
              @click="deleteLink(slotProps.item.id)"
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
import BtnElt from './BtnElt.vue'
import CardElt from './CardElt.vue'
import FieldElt from './FieldElt.vue'
import ListElt from './ListElt.vue'
import TableElt from './TableElt.vue'

import {
  checkRange,
  checkRegex,
  deleteData,
  getItemName,
  getItemsByCat,
  postData,
  putData,
  setError
} from '../assets/services'

export default {
  name: 'LinkSet',
  components: { BtnElt, CardElt, FieldElt, ListElt, TableElt },

  props: ['val', 'links', 'token'],
  data() {
    return {
      name: '',
      url: '',
      cat: ''
    }
  },

  methods: {
    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     *
     * @param {Array<{ name: string }>} items - The array of items with a 'name' property.
     * @returns {Array<{ name: string }>} The filtered array of items.
     */
    getItemsByCategory: (items: Array<{ name: string }>): Array<{ name: string }> => {
      return getItemsByCat(items, 'name')
    },

    /**
     * ? CREATE LINK
     * * Creates a link by sending a POST request to the server with the provided data.
     *
     * @param {FormData} data - The data to send in the request body
     * @returns {Promise<void>} A Promise that resolves when the link is created
     */
    async createLink(): Promise<void> {
      const {
        ALERT_CREATED,
        API_URL,
        CAT_LINK,
        CHECK_STRING,
        CHECK_URL,
        REGEX_URL
      }: {
        ALERT_CREATED: string
        API_URL: string
        CAT_LINK: string
        CHECK_STRING: string
        CHECK_URL: RegExp
        REGEX_URL: string
      } = this.val

      if (this.url.startsWith('http')) this.url = this.url.split('//')[1]
      if (this.cat === '') this.cat = CAT_LINK

      const IS_NAME_CHECKED: boolean = checkRange(this.name, CHECK_STRING)
      const IS_URL_CHECKED: boolean = checkRegex(this.url, CHECK_URL, REGEX_URL)

      if (IS_NAME_CHECKED && IS_URL_CHECKED) {
        const URL: string = `${API_URL}/links`
        const data: FormData = new FormData()

        data.append('name', this.name)
        data.append('url', this.url)
        data.append('cat', this.cat)

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
     * ? UPDATE LINK
     * * Updates a link based on its ID.
     *
     * @param {number} id - The ID of the link to update.
     * @param {void} - A Promise that resolves when the link is updated
     */
    async updateLink(id: number): Promise<void> {
      const {
        CHECK_STRING,
        REGEX_URL,
        CHECK_URL,
        API_URL,
        ALERT_UPDATED
      }: {
        CHECK_STRING: string
        REGEX_URL: string
        CHECK_URL: RegExp
        API_URL: string
        ALERT_UPDATED: string
      } = this.val

      const link: LinkType | undefined = this.links.find((l: LinkType) => l.id === id)
      let { name, url, cat }: { name: string; url: string; cat: string } = link || {
        name: '',
        url: '',
        cat: ''
      }

      const IS_NAME_CHECKED: boolean = link ? checkRange(name, CHECK_STRING) : false
      const IS_URL_CHECKED: boolean = link ? checkRegex(url, CHECK_URL, REGEX_URL) : false

      if (IS_NAME_CHECKED && IS_URL_CHECKED) {
        const URL: string = `${API_URL}/links/${id}`
        const data: FormData = new FormData()

        if (url.startsWith('http')) url = url.split('//')[1]

        data.append('name', name)
        data.append('url', url)
        data.append('cat', cat)

        try {
          await putData(URL, data, this.token)
          alert(`${name} ${ALERT_UPDATED}`)
        } catch (err) {
          setError(err)
        }
      }
    },

    /**
     * ? DELETE LINK
     * * Deletes a link based on its ID.
     * @param {number} id - The ID of the link to be deleted.
     * @returns {Promise<void>}
     */
    async deleteLink(id: number): Promise<void> {
      const { TITLE_DELETE, API_URL, ALERT_DELETED }: { TITLE_DELETE: string; API_URL: string; ALERT_DELETED: string } =
        this.val

      const NAME: string | false = getItemName(id, this.links)

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL: string = `${API_URL}/links/${id}`

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
}
</script>
