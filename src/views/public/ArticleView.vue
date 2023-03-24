<template>
  <main>
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
          :title="constants.TITLE_LIKE_LOGIN + article.name">

          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg">
            </i> <b v-if="article.likes"
              itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === false"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-blue"
          :title="constants.TITLE_LIKE + article.name">

          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg">
            </i> <b v-if="article.likes"
              itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === true"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-sky"
          :title="constants.TITLE_DISLIKE + article.name">

          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg">
            </i> <b v-if="article.likes"
              itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <MediaElt v-if="article.image"
          :src="`/img/articles/${article.image}`"
          :alt="article.alt"
          :width="constants.IMG_WIDTH"
          :height="constants.IMG_HEIGHT"
          itemprop="image">

          <template #figcaption>
            <blockquote v-html="article.text"
              itemprop="text"
              class="container width-sm bord bord-sky blue">
            </blockquote>
            
            <p class="gray">
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
          :comments="comments"
          :constants="constants"/>
      </template>

      <template #aside  v-if="checkRole('user')">
        <CommentCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import MediaElt from "@/assets/MediaElt"

import CommentCreator from "@/components/creators/CommentCreator"
import CommentList from "@/components/lists/CommentList"

export default {
  name: "ArticleView",
  components: {
    BtnElt,
    CardElt,
    MediaElt,
    CommentCreator,
    CommentList
  },
  props: ["constants"],

  data() {
    return {
      article: {}
    }
  },

  created () {
    this.$serve.getData("/articles/" + this.$route.params.id)
      .then((article => {
        this.article = article;

        this.$serve.setMeta(
          article.name + this.constants.HEAD, 
          article.text.slice(0, 160).replace( /(<([^>]+)>)/gi, ""),
          this.constants.UI_URL + "/article/" + this.$route.params.id,
          this.constants.UI_URL + "/img/thumbnails/articles/" + article.image
        );
      }))
      .catch(err => { 
        alert(err.response.data.message);
        this.$router.push("/blog");
      });

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
      if (this.article.likes) {
        return this.$serve.checkLikes(this.article.likes);
      }
    },

    /**
     * ADD LIKE
     */
    addLike() {
      let hasLiked  = false;
      let likes     = this.article.likes;

      for (let i = 0; i < likes.length; i++) {
        if (this.constants.USER_ID === likes[i]) {

          hasLiked = true;
          likes.splice(i, 1);
        }
      }

      if (hasLiked === false) { likes.push(this.constants.USER_ID) }

      let article = new FormData();

      article.append("name", this.article.name);
      article.append("text", this.article.text);
      article.append("image", this.article.image);
      article.append("alt", this.article.alt);
      article.append("likes", likes);
      article.append("cat", this.article.cat);
      article.append("updated", this.article.updated);

      this.$serve.putData(`/articles/${this.article._id}`, article)
        .then(() => {
          if (hasLiked === true) {
            console.log(this.article.name + this.constants.ALERT_DISLIKED);
          } else {
            console.log(this.article.name + this.constants.ALERT_LIKED);
          }
        })
        .catch(err => {
          if (err.response) {
            alert(err.response.data.message) 
          } else {
            console.log(err);
          }
        });
    }
  }
}
</script>
