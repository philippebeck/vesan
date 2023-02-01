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
          <blockquote class="container width-sm bord bord-sky blue">
            {{ post.text }}
          </blockquote>
          
          <p class="silver">
            Created: {{ new Date(post.created).toLocaleDateString() }} 
            (Updated: {{ new Date(post.updated).toLocaleDateString() }})
          </p>
        </template>
      </MediaElt>

      <CreateComment />

      <ListComments v-if="comments.length > 0"
        :comments="getPostComments()"
        :users="users"/>
    </template>
  </CardElt>
</template>

<script>
import CreateComment from "@/components/CreateComment"
import ListComments from "@/components/ListComments"

export default {
  name: "PostView",
  components: {
    CreateComment,
    ListComments
  },

  data() {
    return {
      post: {},
      comments: [],
      users: []
    }
  },

  methods: {
    getPostComments() {
      let postComments = [];

      for (let i = 0 ; i < this.comments.length ; i++) {
        if (this.$route.params.id === this.comments[i].post) {
          postComments.push(this.comments[i]);
        }
      }
      return postComments;
    }
  },

  mounted () {
    this.$serve.getData(`/api/posts/${this.$route.params.id}`)
      .then(res => { this.post = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/comments")
      .then(res => { this.comments = res })
      .catch(err => { console.log(err) });

    this.$serve.getData("/api/users")
      .then(res => { this.users = res })
      .catch(err => { console.log(err) });
  }
}
</script>
