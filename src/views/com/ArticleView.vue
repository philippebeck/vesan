<template>
  <main>
    <CardElt itemscope
      itemtype="https://schema.org/Article">
      <template #header>
        <h1 itemprop="name">{{ article.name }}</h1>
        <strong>{{ article.cat }}</strong>
      </template>

      <template #body>

        <BtnElt v-if="!checkSession('user')"
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
              id="figcaption"
              class="container width-sm bord bord-sky blue">
            </blockquote>
            
            <p class="gray">
              {{ constants.CREATE_ON }}
              <i itemprop="dateCreated">
                {{ new Date(article.createdAt).toLocaleDateString() }}
              </i>
              <br>
              {{ constants.UPDATE_ON }}
              <i itemprop="dateModified">
                {{ new Date(article.updatedAt).toLocaleDateString() }}
              </i>
            </p>
          </template>
        </MediaElt>
      </template>
    </CardElt>

    <CardElt v-if="checkSession('admin') || checkSession('editor')"
      id="create-article">
      <template #header>
        <h2>{{ constants.EDIT }} {{ article.name }}</h2>
      </template>

      <template #body>
        <form method="post"
          enctype="multipart/form-data">
          <ListElt :items="constants.ARTICLE_FORM">

            <template #item-1>
              <FieldElt v-model:value="article.name"
                @keyup.enter="updateArticle()"
                :info="constants.INFO_NAME"
                :min="2">

                <template #legend>
                  {{ constants.LEGEND_NAME }}
                </template>
                <template #label>
                  {{ constants.LABEL_NAME }}
                </template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="text">
                {{ constants.LEGEND_TEXT }}
              </label>

              <Editor id="text"
                :api-key="constants.TINY_KEY"
                v-model="article.text"
                :init="{
                  toolbar:
                    'undo redo outdent indent align lineheight | \
                    bold italic underline strikethrough backcolor | \
                    blocks fontfamily fontsize'
                }"/>
            </template>

            <template #item-3>
              <MediaElt v-if="article.image"
                :src="'/img/thumbnails/articles/' + article.image"
                :alt="article.alt" />

              <FieldElt id="image"
                type="file"
                v-model:value="image"
                :info="constants.INFO_IMAGE">

                <template #legend>
                  {{ constants.LEGEND_IMAGE }}
                </template>
                <template #label>
                  {{ constants.LABEL_IMAGE }}
                </template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt type="textarea"
                v-model:value="article.alt"
                @keyup.enter="updateArticle()"
                :info="constants.INFO_ALT">

                <template #legend>
                  {{ constants.LEGEND_ALT }}
                </template>
                <template #label>
                  {{ constants.LABEL_ALT }}
                </template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt type="select"
                :list="constants.CATS_ARTICLE"
                v-model:value="article.cat"
                @keyup.enter="updateArticle()"
                :info="constants.INFO_CATEGORY">

                <template #legend>
                  {{ constants.LEGEND_CATEGORY }}
                </template>
                <template #label>
                  {{ constants.LABEL_CATEGORY }}
                </template>
              </FieldElt>
            </template>
          </ListElt>
          <br>

          <BtnElt type="button"
            @click="updateArticle()" 
            class="btn-sky"
            :content="constants.CONTENT_UPDATE"
            :title="constants.TITLE_UPDATE + article.name">

            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"

import Editor from "@tinymce/tinymce-vue"

import { checkRange, checkRole, getData, putData, setError, setMeta } from "servidio"

export default {
  name: "ArticleView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt,
    Editor
  },

  props: ["constants", "user"],
  data() {
    return {
      article: {}
    }
  },

  created () {
    getData(this.constants.API_URL + "/articles/" + this.$route.params.id)
      .then((article => {
        article.likes = JSON.parse(article.likes);
        this.article = article;

        setMeta(
          article.name + this.constants.HEAD, 
          (article.text || "").slice(0, 160).replace( /(<([^>]+)>)/gi, ""),
          this.constants.UI_URL + "/article/" + article.id,
          this.constants.UI_URL + "/img/thumbnails/articles/" + article.image
        );

      }))
      .catch(err => { 
        setError(err);
        this.$router.push("/blog");
      });
  },

  updated() {
    if (document.getElementById("figcaption")) {
      const textElt = document.getElementById("figcaption");
      textElt.firstChild.setAttribute("itemprop", "text");
    }
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * CHECK LIKES
     * @returns
     */
    checkLikes() {
      if (this.article.likes) {
        return this.article.likes.includes(this.constants.USER_ID);
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
          likes.splice(i, 1);
          hasLiked = true;
        }
      }

      if (hasLiked === false) likes.push(this.constants.USER_ID);

      const URL   = this.constants.API_URL + "/articles/" + this.article.id;
      const data  = new FormData();

      data.append("name", this.article.name);
      data.append("text", this.article.text);
      data.append("image", this.article.image);
      data.append("alt", this.article.alt);
      data.append("likes", JSON.stringify(likes));
      data.append("cat", this.article.cat);

      putData(URL, data, this.constants.TOKEN)
        .then(() => {
          if (hasLiked === true) {
            console.log(this.article.name + this.constants.ALERT_DISLIKED);
          } else {
            console.log(this.article.name + this.constants.ALERT_LIKED);
          }
        })
        .catch(err => { setError(err) });
    },

    /**
     * UPDATE ARTICLE
     */
    updateArticle() {
      const MAX = this.constants.TEXT_MAX;
      const MIN = this.constants.TEXT_MIN;
      const MSG = this.constants.CHECK_STRING;

      if (checkRange(this.article.name, MSG) && 
          checkRange(this.article.text, MSG, MIN, MAX) && 
          checkRange(this.article.alt, MSG)) {

        const URL   = this.constants.API_URL + "/articles/" + this.article.id;
        const data  = new FormData();
        let image   = document.getElementById("image").files[0] ?? this.article.image;

        data.append("name", this.article.name);
        data.append("text", this.article.text);
        data.append("image", image);
        data.append("alt", this.article.alt);
        data.append("likes", JSON.stringify(this.article.likes));
        data.append("cat", this.article.cat);

        console.log(typeof data, data);
        console.log(typeof image, image);

        putData(URL, data)
          .then(() => {
            alert(this.article.name + this.constants.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
