<template>
  <CardElt itemscope
    itemtype="https://schema.org/Article">
    <template #header>
      <h1 itemprop="name">{{ article.name }}</h1>
      <strong>{{ article.cat }}</strong>
    </template>

    <template #body>

      <BtnElt v-if="!checkRole('user')"
        id="likes"
        href="/login"
        class="btn-blue"
        :title="constants.LIKE_LOGIN + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === false"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-blue"
        :title="constants.LIKE + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <BtnElt v-else-if="checkLikes() === true"
        id="likes"
        type="button"
        @click="addLike()"
        class="btn-sky"
        :title="constants.DISLIKE + article.name">

        <template #btn>
          <i class="fa-regular fa-thumbs-up fa-lg">
          </i> <b v-if="article.usersLiked"
            itemprop="contentRating">
            {{ article.usersLiked.length }}
          </b>
        </template>
      </BtnElt>

      <MediaElt v-if="article.image"
        :src="`/img/articles/${article.image}`"
        :alt="article.alt"
        itemprop="image">

        <template #figcaption>
          <blockquote v-html="article.text"
            itemprop="text"
            class="container width-sm bord bord-sky blue">
          </blockquote>
          
          <p class="silver">
            {{ constants.CREATE_BY }}
            <b itemprop="author">
              {{ article.user }}
            </b>
            {{ constants.ON }} 
            <i itemprop="dateCreated">
              {{ new Date(article.created).toLocaleDateString() }}
            </i>
            / {{ constants.UPDATE_ON }}
            <i itemprop="dateModified">
              {{ new Date(article.updated).toLocaleDateString() }}
            </i>
          </p>
        </template>
      </MediaElt>

      <CommentList v-if="comments.length > 0"
        :comments="comments"/>
    </template>

    <template #aside  v-if="checkRole('user')">
      <CommentCreator />
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "/constants"
import CommentCreator from "@/components/creators/CommentCreator"
import CommentList from "@/components/lists/CommentList"

export default {
  name: "ArticleView",
  components: {
    CommentCreator,
    CommentList
  },

  data() {
    return {
      constants: {}
    }
  },

  mounted () {
    this.constants = constants;
    this.$store.dispatch("readArticle", this.$route.params.id);
    this.$store.dispatch("listArticleComments", this.$route.params.id);
},

  computed: {
    ...mapState(["article", "comments", "user"])
  },

  methods: {
    ...mapActions(["readArticle", "listArticleComments"]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes() {
      if (this.article.usersLiked) {
        return this.$serve.checkLikes(this.article.usersLiked);
      }
    },

    /**
     * ADD LIKE
     */
    addLike() {
      let hasLiked = false;
      let usersLiked = this.article.usersLiked;

      for (let i = 0; i < usersLiked.length; i++) {
        if (constants.USER_ID === usersLiked[i]) {
          hasLiked = true;
          usersLiked.splice(i, 1);
        }
      }

      if (hasLiked === false) {
        usersLiked.push(constants.USER_ID);
      }

      let article = new FormData();
      article.append("id", this.article._id);
      article.append("name", this.article.name);
      article.append("usersLiked", usersLiked);

      this.$serve.putData(`/api/articles/${article.get("id")}`, article)
        .then(() => {
          if (hasLiked === true) {
            console.log(article.get("name") + " disliked !");
          } else {
            console.log(article.get("name") + " liked !");
          }
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
