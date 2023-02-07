<template>
  <NavElt :items="setCats"
    class="sidebar">

    <template #items="slotProps">
      <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
    </template>

    <template #last v-if="checkSession('author')">
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
          <BtnElt :content="slotProps.value.name"
            :href="`https://${slotProps.value.url}`" 
            :title="slotProps.value.url"
            class="btn-blue"/>
        </template>
      </ListElt>
    </template>

    <template #aside v-if="checkSession('author')">
      <CreateLink />
    </template>

  </CardElt>
</template>

<script>
import CreateLink from "@/components/creators/CreateLink"

export default {
  name: "HomeView",
  components: {
    CreateLink
  },

  data() {
    return {
      links: [],
      users: [],
      userId: null
    }
  },
  computed: {
    /**
     * SET CATEGORIES
     * @returns
     */
    setCats() {
      return this.$serve.setCats(this.links);
    }
  },
  methods: {
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
    },
  },
  
  mounted () {
    this.$serve.getData("/api/users/check")
      .then(res => { this.users = res; })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/links")
      .then(res => { this.links = res; })
      .catch(err => { console.log(err) });
  }
}
</script>
