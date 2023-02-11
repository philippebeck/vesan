<template>
  <CardElt v-if="this.$route.params.id">
    <template #header>
      <i class="fa-regular fa-comments fa-2x"></i>
      <h2>List Comments</h2>
    </template>

    <template #body>
      <ListElt :items="comments"
        :dynamic="true">
        <template #items="slotProps">

          <form v-if="slotProps.item.user === constants.USER_ID"
            itemscope
            itemtype="https://schema.org/Comment">

            <FieldElt :id="'text-' + slotProps.item._id"
              type="textarea"
              v-model:value="slotProps.item.text"
              itemprop="text"
              :info="constants.UPDATE_TEXT"
              @keyup.enter="updateComment(slotProps.item._id)"/>

            <BtnElt type="button"
              @click="updateComment(slotProps.item._id)" 
              class="btn-sky"
              :title="'Update comment #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <BtnElt type="button"
              @click="deleteComment(slotProps.item._id)" 
              class="btn-red"
              :title="'Delete comment #' + slotProps.item._id">
              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>

            <p class="silver">
              Created by
              <b itemprop="author">
                {{ getCommentUser(slotProps.item.user) }}
              </b>
              on 
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / Updated on 
              <i itemprop="dateModified">
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </p>
          </form>

          <figure v-else
            itemscope
            itemtype="https://schema.org/Comment">
            <blockquote itemprop="text"
              class="container-90sm-80md-70lg-60xl-50wd bord bord-sky blue">
              {{ slotProps.item.text }}
            </blockquote>
            <br>
            <figcaption class="silver">
              Created by
              <b itemprop="author">
                {{ getCommentUser(slotProps.item.user) }}
              </b>
              on 
              <i itemprop="dateCreated">
                {{ new Date(slotProps.item.created).toLocaleDateString() }}
              </i>
              / Updated on 
              <i itemprop="dateModified">
                {{ new Date(slotProps.item.updated).toLocaleDateString() }}
              </i>
            </figcaption>
          </figure>

        </template>
      </ListElt>
    </template>
  </CardElt>

  <CardElt v-else>
    <template #header>
      <i class="fa-regular fa-comments fa-2x"></i>
      <h3>List Comments</h3>
    </template>

    <template #body>
      <form method="post">
        <TableElt :items="comments">
          <template #head>up/del</template>

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ comments[slotProps.index]._id }})
          </template>

          <!-- Text -->
          <template #cell-text="slotProps">
            {{ comments[slotProps.index].text }}
          </template>

          <!-- Article -->
          <template #cell-article="slotProps">
            <b>{{ getCommentArticle(comments[slotProps.index].article) }}</b>
            ({{ comments[slotProps.index].article }})
          </template>

          <!-- User -->
          <template #cell-user="slotProps">
            <b>{{ getCommentUser(comments[slotProps.index].user) }}</b>
            ({{ comments[slotProps.index].user }})
          </template>

          <!-- Moderate -->
          <template #cell-moderate="slotProps">
            <FieldElt :id="'text-' + comments[slotProps.index]._id"
              type="select"
              v-model:value="getComments()[slotProps.index].moderate"
              :list="constants.IS_MODERATE"
              :info="constants.UPDATE_MODERATE"
              @keyup.enter="updateComment(comments[slotProps.index]._id)"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            {{ new Date(comments[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(comments[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update -->
            <BtnElt type="button"
              @click="updateComment(comments[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update comment #' + comments[slotProps.index]._id">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteComment(comments[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete comment #' + comments[slotProps.index]._id">
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
import constants from "/constants";

export default {
  name: "ListComments",
  props: ["comments", "articles", "users"],

  data() {
    return {
      constants: []
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * GET ALL COMMENTS
     */
    getComments() {
      return this.comments;
    },
    
    /**
     * GET COMMENT ARTICLE
     * @param {string} articleId 
     */
    getCommentArticle(articleId) {
      for (let i = 0; i < this.articles.length; i++ ) {
        if (articleId === this.articles[i]._id) {

          return this.articles[i].title;
        }
      }
    },

    /**
     * GET COMMENT USER
     * @param {string} userId 
     */
    getCommentUser(userId) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (userId === this.users[i]._id) {

          return this.users[i].name;
        }
      }
    },

    /**
     * UPDATE COMMENT
     * @param {string} id 
     */
    updateComment(id) {
      for (let i = 0; i < this.comments.length; i++ ) {
        if (this.comments[i]._id === id) {
          let comment = new FormData();

          comment.append("id", id);
          comment.append("text", this.comments[i].text);
          comment.append("moderate", this.comments[i].moderate);
          comment.append("updated", Date.now());

          this.$serve.putData(`/api/comments/${id}`, comment)
            .then(() => {
              alert(`Comment #${id} updated !`);
              this.$router.go();
            })
            .catch(err => { console.log(err) });
        }
      }
    },

    /**
     * DELETE COMMENT
     * @param {string} id 
     */
    deleteComment(id) {
      if (confirm(`Delete comment #${id} ?`) === true) {

        this.$serve.deleteData(`/api/comments/${id}`)
          .then(() => {
            alert(`Comment #${id} deleted !`);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
