<template>

  <!-- COMMENT CREATION ADMIN -->
  <form method="post"
    class="form width-lg container-60lg-50wd">
    <ListElt :items="['text', 'post', 'user']">

      <!-- Comment Text -->
      <template #item-1>
        <FieldElt id="comment-text"
          v-model:value="text"
          info="Thanks for this post !"
          @keyup.enter="validateNewComment()"
          :min="parseInt('2')">
          <template #legend>
            Text
          </template>
          <template #label>
            Indicate the comment text
          </template>
        </FieldElt>
      </template>

      <!-- Comment Post -->
      <template #item-2>
        <FieldElt id="comment-post"
          v-model:value="post"
          info=""
          @keyup.enter="validateNewComment()">
          <template #legend>
            Post
          </template>
          <template #label>
            Choose the linked post
          </template>
        </FieldElt>
      </template>
      
      <!-- Comment User -->
      <template #item-3>
        <FieldElt id="comment-user"
          v-model:value="user"
          info="">
          <template #legend>
            User
          </template>
          <template #label>
            Choose the linked user
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      content="Create"
      @click="validateNewComment()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateComment",

  data() {
    return {
      text: "",
      user:"",
      post: "",
      pass: ""
    }
  },

  methods: {
    /**
     * VALIDATE NEW COMMENT IF DATA ARE VALID
     */
    validateNewComment() {
      if (this.$serve.checkText(this.text) && 
        this.$serve.checkPost(this.post) && 
        this.$serve.checkPass(this.pass)) {

        if (typeof document.getElementById('user').files[0] !== "undefined") {
          this.checkNewComment();

        } else {
          alert("Une photo de l'utilisateur doit être uploadée !");
        }
      }
    },

    /**
     * CHECK NEW COMMENT IF NAME | EMAIL ARE REFERENCED
     */
    checkNewComment() {
      this.$serve.getData("/api/comments")
        .then((comments) => {
          let isReferenced = false;

          for (let i = 0; i < comments.length; i++) {

            if (comments[i].text === this.text) {
              alert(this.text + " is not available !");
              isReferenced = true;
            }

            if (comments[i].post === this.post) {
              alert(this.post + " is already referenced !");
              isReferenced = true;
            }
          }

          this.createComment(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE COMMENT IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createComment(isReferenced) {
      if (!isReferenced) {
        let comment  = new FormData();
        let user = document.getElementById('user').files[0];

        comment.append("text", this.text);
        comment.append("post", this.post);
        comment.append("user", user);
        comment.append("pass", this.pass);

        this.$serve.postData("/api/comments", comment)
          .then(() => {
            alert(comment.get("text") + " created !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>