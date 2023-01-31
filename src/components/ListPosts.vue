<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-envelopes-bulk fa-2x"></i>
      <h3>List Posts</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="posts">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- Current Post Image -->
          <template #cell-_id="slotProps">
            <MediaElt :src="'/img/posts/' + posts[slotProps.index].image"
              :alt="posts[slotProps.index].title"
              :title="posts[slotProps.index].image">
            </MediaElt>
          </template>

          <!-- Post Title -->
          <template #cell-title="slotProps">
            <FieldElt :id="'title-' + posts[slotProps.index]._id"
              v-model:value="getPosts()[slotProps.index].title"
              @keyup.enter="validateUpdatedPost(posts[slotProps.index]._id)"
              info="Update the post title">
            </FieldElt>
          </template>

          <!-- Post Text -->
          <template #cell-text="slotProps">
            <FieldElt :id="'text-' + posts[slotProps.index]._id"
              type="textarea"
              v-model:value="getPosts()[slotProps.index].text"
              @keyup.enter="validateUpdatedPost(posts[slotProps.index]._id)"
              info="Update the post text">
            </FieldElt>
          </template>

          <!-- Post Image -->
          <template #cell-image="slotProps">
            <FieldElt :id="'image-' + posts[slotProps.index]._id"
              type="file"
              info="Update the post image">
            </FieldElt>
          </template>

          <!-- Post Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + posts[slotProps.index]._id"
              v-model:value="getPosts()[slotProps.index].alt"
              @keyup.enter="validateUpdatedPost(posts[slotProps.index]._id)"
              info="Update the post title">
            </FieldElt>
          </template>

          <!-- Post Author -->
          <template #cell-author="slotProps">
            <FieldElt :id="'author-' + posts[slotProps.index]._id"
              v-model:value="getPosts()[slotProps.index].author"
              @keyup.enter="validateUpdatedPost(posts[slotProps.index]._id)"
              info="Update the post author">
            </FieldElt>
          </template>

          <!-- Post Category -->
          <template #cell-cat="slotProps">
            <FieldElt :id="'cat-' + posts[slotProps.index]._id"
              type="select"
              v-model:value="getPosts()[slotProps.index].cat"
              @keyup.enter="validateUpdatedPost(posts[slotProps.index]._id)"
              :list="['sport']"
              info="Update the category">
              {{ value }}
            </FieldElt>
          </template>

          <!-- Post User -->
          <template #cell-userId="slotProps">
            {{ getPostUser(getPosts()[slotProps.index].userId) }}
          </template>

          <!-- Post Created -->
          <template #cell-createdDate="slotProps">
            {{ new Date(getPosts()[slotProps.index].createdDate).toLocaleString() }}
          </template>

          <!-- Post Updated -->
          <template #cell-updatedDate="slotProps">
            {{ new Date(getPosts()[slotProps.index].updatedDate).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update Button -->
          <BtnElt type="button"
              @click="validateUpdatedPost(posts[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + posts[slotProps.index].title">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
            <BtnElt type="button"
              @click="deletePost(posts[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + posts[slotProps.index].title">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ListPosts",
  props: ["posts", "users"],

  methods: {
    /**
     * GET ALL POSTS
     */
    getPosts() {
      return this.posts;
    },

    /**
     * GET POST USER
     * @param {string} userId 
     */
    getPostUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i]._id) {

          return this.users[i].name;
        }
      }
    },

    validateUpdatedPost(id) {
      for (let i = 0; i < this.posts.length; i++ ) {
        if (this.posts[i]._id === id) {

          if (this.$serve.checkName(this.posts[i].title)) {
            this.checkUpdatedPost(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED POST IF NAME | EMAIL ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedPost(i) {
      this.$serve.getData("/api/posts")
        .then((posts) => {
          let isReferenced = false;

          for (let j = 0; j < posts.length; j++) {
            if (posts[j]._id === this.posts[i]._id) {
              posts.splice(j, 1);
            }

            if (posts[j] && posts[j].title === this.posts[i].title) {
              alert(this.posts[i].title + " is not available !");
              isReferenced = true;
            }

            if (posts[j] && posts[j].text === this.posts[i].text) {
              alert(this.posts[i].text+ " is already referenced !");
              isReferenced = true;
            }
          }
          this.updatePost(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE POST IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updatePost(isReferenced, i) {
      if (!isReferenced) {

        let post  = new FormData();
        let image = document.getElementById('image-' + this.posts[i]._id).files[0];

        if (typeof image === "undefined") {
          image = this.posts[i].image;
        }

        post.append("id", this.posts[i]._id);
        post.append("title", this.posts[i].title);
        post.append("text", this.posts[i].text);
        post.append("image", image);
        post.append("alt", this.posts[i].alt);
        post.append("cat", this.posts[i].cat);
        post.append("userId", this.posts[i].userId);
        post.append("createdDate", this.posts[i].createdDate);
        post.append("updatedDate", Date.now());
        post.append("likes", this.posts[i].likes);
        post.append("usersLiked", this.posts[i].usersLiked);

        this.$serve.putData(`/api/posts/${post.get("id")}`, post)
          .then(() => {
            alert(post.get("title") + " updated !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    },

    /**
     * DELETE POST
     * @param {string} id 
     */
    deletePost(id) {
      let postTitle = "";

      for (let i = 0; i < this.posts.length; i++ ) {
        if (this.posts[i]._id === id) {
          postTitle = this.posts[i].title;
        }
      }
      
      if (confirm(`Delete ${postTitle} ?`) === true) {
        this.$serve.deleteData(`/api/posts/${id}`)
          .then(() => {
            alert(postTitle + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
