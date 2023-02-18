<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #items="slotProps">
      <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
    </template>

    <template #last v-if="checkRole('admin')">
      <a href="#create-link"
        :title="constants.SIDEBAR_LINK">
        <i class="fa-solid fa-link fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <h1 class="sky anima-slideR">
        <i class="fa-solid fa-link fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.TITLE_LINK }}
      </h1>
    </template>

    <template #body>
      <ListElt :items="sortItemsByCat(links)"
        :dynamic="true">
        <template #items="slotProps">
          <i :id="slotProps.index"
            :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-5x sky shatex-blur-md anima-grow mar-lg`">
          </i>
        </template>

        <template #nested="slotProps">
          <BtnElt :href="`https://${slotProps.value.url}`" 
            class="btn-blue"
            :content="slotProps.value.name"
            :title="slotProps.value.url"/>
        </template>
      </ListElt>
    </template>

    <template #aside v-if="checkRole('admin')">
      <CreateLink />
    </template>

  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "/constants"
import CreateLink from "@/components/creators/CreateLink"

export default {
  name: "LinkView",
  components: {
    CreateLink
  },

  data() {
    return {
      constants: {}
    }
  },

  mounted () {
    this.constants = constants;
    this.$store.dispatch("listLinks");
  },

  computed: {
    ...mapState([
      "user",
      "links"
    ]),

    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.links);
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
    sortItemsByCat(items) {
      return this.$serve.sortItemsByCat(items);
    }
  }
}
</script>
