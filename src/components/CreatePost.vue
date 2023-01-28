<template>

  <!-- POST CREATION ADMIN -->
  <form method="post"
    enctype="multipart/form-data"
    class="form width-lg container-60lg-50wd">
    <ListElt :items="['title', 'text', 'image', 'author']">

      <!-- Post Title -->
      <template #item-1>
        <FieldElt id="post-title"
          v-model:value="title"
          info="My new post"
          @keyup.enter="validateNewPost()"
          :min="parseInt('2')">
          <template #legend>
            Title
          </template>
          <template #label>
            Indicate the post title
          </template>
        </FieldElt>
      </template>

      <!-- Post Text -->
      <template #item-2>
        <FieldElt id="post-text"
          v-model:value="text"
          info="Once upon a time..."
          @keyup.enter="validateNewPost()"
          type="textarea">
          <template #legend>
            Text
          </template>
          <template #label>
            Indicate the post text
          </template>
        </FieldElt>
      </template>
      
      <!-- Post Image -->
      <template #item-3>
        <FieldElt id="post-image"
          v-model:value="image"
          info="Image file only"
          type="file">
          <template #legend>
            Image
          </template>
          <template #label>
            Provide post image
          </template>
        </FieldElt>
      </template>

      <!-- Post Author -->
      <template #item-4>
        <FieldElt id="post-author"
          v-model:value="author"
          info="John Doe"
          @keyup.enter="validateNewPost()">
          <template #legend>
            Author
          </template>
          <template #label>
            Indicate the post author
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      content="Create"
      @click="validateNewPost()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreatePost",

  data() {
    return {
      title: "",
      text:"",
      image: "",
      author: ""
    }
  },

  methods: {
    /**
     * VALIDATE NEW POST IF DATA ARE VALID
     */
    validateNewPost() {
      if (this.$serve.checkName(this.title) &&
        this.$serve.checkName(this.author)) {

        if (typeof document.getElementById('post-image').files[0] !== "undefined") {
          this.checkNewPost();

        } else {
          alert("A photo of the post must be uploaded !");
        }
      }
    },

    /**
     * CHECK NEW POST IF TITLE | TEXT ARE REFERENCED
     */
    checkNewPost() {
      this.$serve.getData("/api/posts")
        .then((posts) => {
          let isReferenced = false;

          for (let i = 0; i < posts.length; i++) {

            if (posts[i].title === this.title) {
              alert(this.title + " is not available !");
              isReferenced = true;
            }

            if (posts[i].text === this.text) {
              alert(this.text + " is already referenced !");
              isReferenced = true;
            }
          }

          this.createPost(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE POST IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createPost(isReferenced) {
      if (!isReferenced) {
        let post  = new FormData();
        let image = document.getElementById('post-image').files[0];

        post.append("title", this.title);
        post.append("text", this.text);
        post.append("image", image);
        post.append("author", this.author);

        this.$serve.postData("/api/posts", post)
          .then(() => {
            alert(post.get("title") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>