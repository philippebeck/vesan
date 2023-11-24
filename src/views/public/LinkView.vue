<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.LINK_VIEW }}
      </h1>
    </header>

    <NavElt :items="getCategories"
      class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" 
          :title="constants.TITLE_TOGGLE"></i>
      </template>

      <template #items="slotProps">
        <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
      </template>

      <template #last v-if="checkSession('admin')">
        <a href="#create-link"
          :title="constants.LINK_CREATOR">
          <i class="fa-solid fa-link fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" 
          :title="constants.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt id="top"
      :isArticle="true"
      class="container-90sm-80md-70lg-60xl">
      <template #header>
        <h2 class="ani-shrink-loop-altrev-into">
          {{ constants.LINK_SUB }}
        </h2>
        <b>{{ constants.INTRO_LINK }}</b>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(links)"
          :dynamic="true">
          <template #items="slotProps">
            <i :id="slotProps.index"
              :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-5x blue-light mar-lg`">
            </i>
          </template>

          <template #nested="slotProps">
            <BtnElt :href="`https://${slotProps.value.url}`" 
              class="btn-sky"
              :content="slotProps.value.name"
              :title="slotProps.value.url"/>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <LinkCreator :constants="constants"/>
      </template>

    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { checkRole, getCats, getItemsByCat, setMeta } from "../assets/serve"

import BtnElt from "../assets/elements/BtnElt"
import CardElt from "../assets/elements/CardElt"
import ListElt from "../assets/elements/ListElt"
import NavElt from "../assets/elements/NavElt"

import LinkCreator from "../assets/creators/LinkCreator"

export default {
  name: "LinkView",
  components: {
    BtnElt,
    CardElt,
    ListElt,
    NavElt,
    LinkCreator
  },

  props: [
    "constants", 
    "user"
  ],

  created() {
    this.$store.dispatch("listLinks");

    setMeta(
      this.constants.HEAD_LINK, 
      this.constants.META_LINK,
      this.constants.UI_URL + "/link",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  computed: {
    ...mapState(["links"]),

    /**
     * GET CATEGORIES
     * @returns
     */
    getCategories() {
      return getCats(this.links);
    }
  },

  methods: {
    ...mapActions(["listLinks"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    getItemsByCategory(items) {
      return getItemsByCat(items);
    }
  }
}
</script>
