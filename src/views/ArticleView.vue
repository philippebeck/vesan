<template>
  <CardElt>
    <template #header>
      <h1>{{ article.name }}</h1>
      <strong>{{ article.cat }}</strong>
    </template>

    <template #body>
      <MediaElt :src="`/img/articles/${article.image}`"
        :alt="article.alt">

        <template #figcaption>
          <p>
            {{ calculateScoresAverage(article._id) }}
            <i class="fa-solid fa-star"></i>
          </p>
          <p>{{ article.description }}</p>
          <b>{{ article.price }} €</b>
          <p class="silver">
            Created: {{ new Date(article.created).toLocaleDateString() }}
            (Updated: {{ new Date(article.updated).toLocaleDateString() }})
          </p>
        </template>
      </MediaElt>

      <ListReviews v-if="reviews.length > 0"
        :reviews="getArticleReviews()"
        :users="users"/>
    </template>

    <template #aside  v-if="userId">
      <CreateReview />
    </template>
  </CardElt>
</template>

<script>
import CreateReview from "@/components/CreateReview"
import ListReviews from "@/components/ListReviews"

export default {
  name: "ArticleView",

  components: {
    CreateReview,
    ListReviews
  },

  data() {
    return {
      article: {},
      reviews: [],
      users: [],
      userId: null
    }
  },

  mounted () {
    this.$serve.getData(`/api/articles/${this.$route.params.id}`)
      .then(res => { this.article = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });

    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  },

  methods: {
    /** 
     * CALCULATE SCORES AVERAGE
     * @returns
     */
    calculateScoresAverage(articleId) {
      let sumData     = {};
      let averageData = [];

      for (let review of this.reviews) {

        if (sumData[review.article]) {
          sumData[review.article].sum = sumData[review.article].sum + review.score;
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
    },

    /**
     * GET ARTICLE REVIEWS
     * @returns
     */
    getArticleReviews() {
      let articleReviews = [];

      for (let i = 0 ; i < this.reviews.length ; i++) {
        if (this.$route.params.id === this.reviews[i].article) {
          articleReviews.push(this.reviews[i]);
        }
      }
      return articleReviews;
    }
  }
}
</script>
