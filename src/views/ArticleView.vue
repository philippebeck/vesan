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
          <p>Created: {{ article.createdDate }}</p>
          <p>Updated: {{ article.updatedDate }}</p>
        </template>
      </MediaElt>

      <CreateReview />
    </template>
  </CardElt>
</template>

<script>
import CreateReview from "@/components/CreateReview"

export default {
  name: "ArticleView",
  components: {
    CreateReview
  },

  data() {
    return {
      article: {},
      reviews: []
    }
  },

  mounted () {
    this.$serve.getData(`/api/articles/${this.$route.params.id}`)
      .then(res => { this.article = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/reviews")
      .then(res => { this.reviews = res })
      .catch(err => { console.log(err) });
  }
}
</script>
