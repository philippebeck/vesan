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

    <NavElt :items="getCats"
      class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" 
          :title="constants.TITLE_TOGGLE"></i>
      </template>

      <template #items="slotProps">
        <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
      </template>

      <template #last v-if="checkRole('admin')">
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

    <CardElt id="top">
      <template #header>
        <h2>{{ constants.LINK_SUB }}</h2>
        <b>{{ constants.INTRO_LINK }}</b>
      </template>

      <template #body>
        <ListElt :items="getItemsByCat(links)"
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

      <template #aside v-if="checkRole('admin')">
        <LinkCreator :constants="constants"/>
      </template>

    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import ListElt from "@/assets/ListElt"
import NavElt from "@/assets/NavElt"

import LinkCreator from "@/components/creators/LinkCreator"

export default {
  name: "LinkView",
  components: {
    BtnElt,
    CardElt,
    ListElt,
    NavElt,
    LinkCreator
  },
  props: ["constants"],

  created() {
    this.$store.dispatch("listLinks");

    this.$serve.setMeta(
      this.constants.HEAD_LINK, 
      this.constants.META_LINK,
      this.constants.UI_URL + "/link",
      this.constants.UI_URL + "/img/logo.svg"
    );
  },

  computed: {
    ...mapState(["links", "user"]),

    /**
     * SET CATEGORIES
     * @returns
     */
    getCats() {
      return this.$serve.getCats(this.links);
    }
  },

  methods: {
    ...mapActions(["listLinks"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * SORT ITEMS BY CATEGORY
     * @param {array} items 
     */
    getItemsByCat(items) {
      return this.$serve.getItemsByCat(items);
    }
  }
}
</script>
