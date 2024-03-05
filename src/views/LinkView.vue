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
            <i
              :id="slotProps.index"
              :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-5x sky-dark mar-lg`"
            >
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

<script>
import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'
import LinkSet from '../components/LinkSet.vue'
import NavElt from '../components/NavElt.vue'

import { checkRole, getCats, getItemsByCat, setMeta } from '../assets/services'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LinkView',
  components: { BtnElt, CardElt, ListElt, NavElt, LinkSet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * Get the list of links
   * * Set the meta tags
   */
  async created() {
    const { HEAD_LINK, LOGO_SRC, META_LINK, UI_URL } = this.val

    await this.$store.dispatch('listLinks')
    setMeta(HEAD_LINK, META_LINK, `${UI_URL}/link`, UI_URL + LOGO_SRC)
  },

  computed: {
    ...mapState(['links', 'token']),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories using the provided links.
     * @return {Array} An array of categories.
     */
    getCategories() {
      return getCats(this.links)
    }
  },

  methods: {
    ...mapActions(['listLinks']),

    /**
     * ? CHECK SESSION
     * * Check the session for a given role.
     * @param {string} role - the role to check
     * @return {boolean} the result of the session check
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     * @param {Array} items - The array of items.
     * @return {Array} The array of items filtered by category.
     */
    getItemsByCategory(items) {
      return getItemsByCat(items, 'name')
    }
  }
}
</script>
