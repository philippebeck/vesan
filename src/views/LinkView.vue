<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #items="slotProps">
      <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
    </template>

    <template #last  v-if="userId">
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

    <template #aside v-if="userId">
      <CreateLink 
        :cats="cats"/>
    </template>

    <template #body>
      <ListElt :items="itemsByCat(links)"
        :dynamic="true">
        <template #items="slotProps">
          <i 
            :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-5x sky shatex-blur-md anima-grow mar-lg`"
            :id="slotProps.index">
          </i>
        </template>

        <template #nested="slotProps">
          <BtnElt
            :content="slotProps.value.name"
            :href="`https://${slotProps.value.url}`" 
            :title="slotProps.value.url"
            class="btn-blue"/>
        </template>
      </ListElt>
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
      userId: null
    }
  },
  computed: {
    cats() {
      const cats = new Set();
      this.links.forEach(link => cats.add(link.cat));
      return Array.from(cats); 
    }
  },
  methods: {
    /**
     * RETURN AN ARRAY OF ITEMS BY CATEGORY
     * @param {object} items 
     */
    itemsByCat(items) {
      const itemsByCat = {};
      items.forEach(item => {
        if (!itemsByCat[item.cat]) {
          itemsByCat[item.cat] = [];
        }
        itemsByCat[item.cat].push(item);
        itemsByCat[item.cat].sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
      return itemsByCat;
    },
  },
  
  mounted () {
    this.$serve.getData("/api/links")
      .then(response => {
        this.links = response;
      })
      .catch(err => { console.log(err) });


    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  }
}
</script>
