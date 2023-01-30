<template>
  <CardElt>
    <template #header>
      <h1>{{ post.title }}</h1>
      <strong>{{ post.cat }}</strong>
    </template>

    <template #body>
      <i class="fa-regular fa-thumbs-up"></i>

      <MediaElt :src="`/img/posts/${post.image}`"
        :alt="post.alt">

        <template #figcaption>
          <p>{{ post.text }}</p>
          <p>Created: {{ post.createdDate }}</p>
          <p>Updated: {{ post.updatedDate }}</p>
        </template>
      </MediaElt>

      <CreateComment />
    </template>
  </CardElt>
</template>

<script>
import CreateComment from "@/components/CreateComment"

export default {
  name: "PostView",
  components: {
    CreateComment
  },

  data() {
    return {
      post: {},
      comments: [],
      user: {}
    }
  },

  mounted () {
    this.$serve.getData(`/api/posts/${this.$route.params.id}`)
      .then(res => { this.post = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/comments")
      .then(res => { this.comments = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users/" + this.post.userId)
      .then(res => { this.user = res })
      .catch(err => { console.log(err) });
  }
}
</script>
