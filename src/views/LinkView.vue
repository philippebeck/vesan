<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #items="slotProps">
      <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
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
export default {
  name: "HomeView",
  data() {
    return {
      links: []
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
  
  created () {
    this.$serve.getData("/api/links")
      .then(response => {
        this.links = response;
      })
      .catch(err => { console.log(err) });
  }
}
</script>
