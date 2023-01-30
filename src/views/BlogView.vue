<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <h1 class="blue shatex-blur-sm anima-slideB">
        Blog
      </h1>
      <strong class="gray">
        Posts to read !
      </strong>
      <p>Under construction !</p>
    </template>

    <template #body>
      <ListElt :items="itemsByCat(posts)"
        :dynamic="true">

        <template #items="slotProps">
          <h2>{{ slotProps.item[0].cat }}</h2>
        </template>

        <template #nested="slotProps">
          <a :href="`post/${slotProps.value._id}`">
            <MediaElt :src="`img/posts/${slotProps.value.image}`" 
              :alt="`${slotProps.value.title}`" 
              :id="`${slotProps.value.title.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`">

              <template #figcaption>
                <h3>{{ slotProps.value.title }}</h3>
                <blockquote>{{ slotProps.value.text }}</blockquote>
              </template>

            </MediaElt>
          </a>
        </template>
      </ListElt>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "BlogView",

  data() {
    return {
      posts: []
    }
  },

  mounted () {
    this.$serve.getData("/api/posts")
      .then(res => { this.posts = res })
      .catch(err => { console.log(err) });
  },

  computed: {
    cats() {
      const cats = new Set();
      this.posts.forEach(post => cats.add(post.cat));
      return Array.from(cats); 
    }
  },

  methods: {
    /**
     * GET ITEMS BY CATEGORY
     * @param {*} items 
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
    }
  }
}
</script>
