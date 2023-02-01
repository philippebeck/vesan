<template>
  <NavElt
    type="sidebar"
    :items="cats"
    class="sidebar">

    <template #last v-if="userId">
      <a href="#create-article"
        title="Create an article">
        <i class="fa-solid fa-basket-shopping fa-fw"></i>
      </a>
    </template>

    <template #top>
      <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
    </template>
  </NavElt>

  <CardElt id="top">
    <template #header>
      <h1 class="blue shatex-blur-sm anima-slideB">
        Shop
      </h1>
      <strong class="gray">
        Articles to buy !
      </strong>
      <p>Under construction !</p>
    </template>

    <template #aside v-if="userId">
      <CreateArticle />
    </template>

    <template #body>
      <ListElt :items="itemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat">{{ slotProps.item[0].cat }}</h2>
        </template>

        <template #nested="slotProps">
          <a :href="`article/${slotProps.value._id}`">
            <MediaElt :src="`img/articles/${slotProps.value.image}`" 
              :alt="`${slotProps.value.description}`" 
              :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`">

              <template #figcaption>
                <h3>{{ slotProps.value.name }}</h3>
                <p>{{ slotProps.value.description }}</p>
                <b>{{ slotProps.value.price }} €</b>
              </template>

            </MediaElt>
          </a>
        </template>

      </ListElt>
    </template>
  </CardElt>
</template>

<script>
import CreateArticle from "@/components/CreateArticle"

export default {
  name: "ShopView",
  components: {
    CreateArticle
  },

  data() {
    return {
      articles: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/articles")
      .then(res => { this.articles = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  computed: {
    cats() {
      const cats = new Set();
      this.articles.forEach(article => cats.add(article.cat));
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
