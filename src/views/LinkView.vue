<template>
  <main id="top">
    <header>
      <h1 class="sky-dark"><i class="fa-solid fa-link fa-lg"></i> {{ val.LINK_VIEW }}</h1>
    </header>

    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #items="slotProps">
        <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#link-set" :title="val.LINK_MANAGER">
          <i class="fa-solid fa-list-check fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt :isArticle="true" class="container-90md-80xl">
      <template #header>
        <h2 class="ani-shrink-loop-altrev-into">{{ val.LINK_SUB }}</h2>
        <b>{{ val.INTRO_LINK }}</b>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(links)" :dynamic="true">
          <template #items="slotProps">
            <i :id="slotProps.index" :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-5x sky-dark mar-lg`">
            </i>
          </template>

          <template #nested="slotProps">
            <BtnElt
              :href="`https://${slotProps.value.url}`"
              class="btn-sky"
              :content="slotProps.value.name"
              :title="slotProps.value.url"
              target="_blank"
              rel="noopener noreferrer"
            />
          </template>
        </ListElt>
      </template>
      <template #aside v-if="checkSession('editor')">
        <LinkSet :links="links" :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { checkRole, getCats, getItemsByCat, setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'
import LinkSet from '../components/LinkSet.vue'
import NavElt from '../components/NavElt.vue'

interface Val {
  HEAD_LINK: string
  LOGO_SRC: string
  META_LINK: string
  UI_URL: string
}

export default defineComponent({
  name: 'LinkView',
  components: { BtnElt, CardElt, ListElt, NavElt, LinkSet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * Get the list of links
   * * Set the meta tags
   */
  async created(): Promise<void> {
    const { HEAD_LINK, LOGO_SRC, META_LINK, UI_URL }: Val = this.val
    setMeta(HEAD_LINK, META_LINK, `${UI_URL}/link`, UI_URL + LOGO_SRC)

    await this.$store.dispatch('listLinks')
  },

  computed: {
    ...mapState(['links', 'token']),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories using the provided links.
     *
     * @return {string[]} An array of link categories.
     */
    getCategories(): string[] {
      return getCats(this.links)
    }
  },

  methods: {
    ...mapActions(['listLinks']),

    /**
     * ? CHECK SESSION
     * * Check the session for a given role.
     *
     * @param {string} role - the role to check
     * @return {boolean} the result of the session check
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     *
     * @param {{id: string, name: string, cat: string}[]} items - The array of items.
     * @return {Record<string, { id: string; name: string }[]>} The items filtered by category.
     */
    getItemsByCategory(
      items: { id: string; name: string; cat: string }[]
    ): Record<string, { id: string; name: string }[]> {
      return getItemsByCat(items)
    }
  }
})
</script>
