<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #items="slotProps">
      <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
    </template>

    <template #last v-if="checkSession('admin')">
      <a href="#create-link"
        title="Create a link">
        <i class="fa-solid fa-link fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <i class="blue anima-slideL fa-solid fa-link fa-3x"></i>
      <h1 class="sky anima-slideR">
        Links for dev
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

    <template #aside v-if="checkSession('admin')">
      <CreateLink />
    </template>

  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import CreateLink from "@/components/creators/CreateLink"

export default {
  name: "HomeView",
  components: {
    CreateLink
  },

  data() {
    return {
      userId: null
    }
  },

  mounted () {
    this.$store.dispatch("listLinks");
    this.$store.dispatch("checkUsers");
  },

  computed: {
    ...mapState([
      "links", 
      "users"
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
    ...mapActions([
      "checkUsers", 
      "listLinks"
    ]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.users, role);
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
