<template>
  <CardElt>
    <template #header>
      <h1>Article View</h1>
      <p>Under construction !</p>
    </template>

    <template #body>
      <MediaElt :src="`/img/articles/${article.image}`"
        :alt="article.description">

        <template #figcaption>
          <h2>{{ article.name }}</h2>
          <p>{{ article.description }}</p>
          <b>{{ article.price }} €</b>
          <p>Last update : {{ article.date }}</p>
        </template>
      </MediaElt>
    </template>
  </CardElt>

  
</template>

<script>
export default {
  name: "ArticleView",

  data() {
    return {
      article: {}
    }
  },

  mounted () {
    this.$serve.getData(`/api/articles/${this.$route.params.id}`)
      .then(res => { this.article = res })
      .catch(err => { console.log(err) });
  }
}
</script>
