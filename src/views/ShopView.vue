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
      <CreateArticle 
        :cats="cats"/>
    </template>

    <template #body>
      <ListElt :items="itemsByCat(articles)"
        :dynamic="true">

        <template #items="slotProps">
          <h2 :id="slotProps.item[0].cat">{{ slotProps.item[0].cat }}</h2>
        </template>

        <template #nested="slotProps">
          <BtnElt  v-if="calculateScoresAverage(slotProps.value._id) !== undefined"
            :href="`article/${slotProps.value._id}#reviews`"
            class="btn-violet"
            :title="`Read Reviews about ${slotProps.value.name}`">
            <template #btn>
              {{ calculateScoresAverage(slotProps.value._id) }}
              <i class="fa-solid fa-star"></i>
            </template>
          </BtnElt>

          <BtnElt v-else 
            :href="`article/${slotProps.value._id}#review`"
            class="btn-violet"
            content="Write a Review !"
            :title="`Be the first to write a Review about ${slotProps.value.name}`" />

          <a :href="`article/${slotProps.value._id}`"
            :title="`Watch ${slotProps.value.name}`">
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
import CreateArticle from "@/components/creators/CreateArticle"

export default {
  name: "ShopView",
  components: {
    CreateArticle
  },

  data() {
    return {
      articles: [],
      reviews: [],
      scores: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData("/api/articles")
      .then(res => { this.articles = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
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
    },

    /** 
     * CALCULATE SCORES AVERAGE
     * @returns
     */
    calculateScoresAverage(articleId) {
      let sumData     = {};
      let averageData = [];

      for (let review of this.reviews) {

        if (sumData[review.article]) {
          sumData[review.article].sum += review.score;
          sumData[review.article].n++;

        } else {
          sumData[review.article] = {
            sum: review.score,
            n: 1
          };
        }
      }

      for (let element of Object.keys(sumData)) {
          averageData.push({
            article: element,
              score: sumData[element].sum / sumData[element].n
          });
      }

      for (let data of averageData) {
        if (articleId === data.article) {

          return data.score;
        }
      }
    }
  }
}
</script>
