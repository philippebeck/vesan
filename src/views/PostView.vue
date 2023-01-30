<template>
  <CardElt>
    <template #header>
      <h1>Post View</h1>
      <p>Under construction !</p>
    </template>

    <template #body>
      <MediaElt :src="`/img/posts/${post.image}`"
        :alt="post.title">

        <template #figcaption>
          <h2>{{ post.title }}</h2>
          <p>{{ post.text }}</p>
          <p>Last update {{ post.date }}</p>
        </template>
      </MediaElt>
    </template>
  </CardElt>

  
</template>

<script>
export default {
  name: "PostView",

  data() {
    return {
      post: {}
    }
  },

  mounted () {
    this.$serve.getData(`/api/posts/${this.$route.params.id}`)
      .then(res => { this.post = res })
      .catch(err => { console.log(err) });
  }
}
</script>
