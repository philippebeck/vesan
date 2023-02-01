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

  methods: {
    getArticleReviews() {
      let articleReviews = [];

      for (let i = 0 ; i < this.reviews.length ; i++) {
        if (this.$route.params.id === this.reviews[i].article) {
          articleReviews.push(this.reviews[i]);
        }
      }
      return articleReviews;
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
  }
}
</script>
