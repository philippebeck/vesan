<template>
  <CardElt>
    <template #header>
      <h1>{{ article.name }}</h1>
      <strong>{{ article.cat }}</strong>
    </template>

    <template #body>
      <BtnElt v-if="calculateScoresAverage(article._id) !== undefined" 
        href="#reviews"
        class="btn-violet"
        :title="`Read Reviews about ${article.name}`">
        <template #btn>
          {{ calculateScoresAverage(article._id) }}
        <i class="fa-solid fa-star fa-lg"></i>
        </template>
      </BtnElt>

      <BtnElt v-else 
        href="#review"
        class="btn-violet"
        content="Need a Review !"
        :title="`Be the first to write a Review about ${article.name}`" />

      <MediaElt :src="`/img/articles/${article.image}`"
        :alt="article.alt">

        <template #figcaption>
          <p>{{ article.description }}</p>
          <b>{{ article.price }} €</b>

          <p class="silver">
            Created: {{ new Date(article.created).toLocaleDateString() }}
            (Updated: {{ new Date(article.updated).toLocaleDateString() }})
          </p>
        </template>
      </MediaElt>

      <form>
        <FieldElt id="basket-option"
          type="select"
          :list="article.options"
          v-model:value="option"
          @keyup.enter="addToBasket()"
          info="Select an option"
          :min="2">
          <template #legend>
            Option
          </template>
          <template #label>
            Indicate the article option
          </template>
        </FieldElt>

        <FieldElt id="basket-quantity"
          type="number"
          v-model:value="quantity"
          @keyup.enter="addToBasket()"
          info="Choose a quantity"
          :min="1">
          <template #legend>
            Quantity
          </template>
          <template #label>
            Indicate the article quantity
          </template>
        </FieldElt>

        <BtnElt type="button"
          @click="addToBasket()"
          content="Add to Basket"
          class="btn-green width-sm"
          :title="`Add ${article.name} to the basket`">
          <template #btn>
            <i class="fa-solid fa-basket-shopping fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <ListReviews v-if="reviews.length > 0"
        id="reviews"
        :reviews="getArticleReviews()"
        :users="users"/>
    </template>

    <template #aside  v-if="userId">
      <CreateReview id="review"/>
    </template>
  </CardElt>
</template>

<script>
import CreateReview from "@/components/creators/CreateReview"
import ListReviews from "@/components/managers/ListReviews"

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
