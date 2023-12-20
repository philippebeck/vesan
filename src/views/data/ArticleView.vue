<template>
  <main>
    <CardElt v-if="checkSession('editor')">
      <template #header>
        <h1>{{ val.EDIT }} {{ article.name }}</h1>
        <h2>{{ article.cat }}</h2>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.ARTICLE_FORM">

            <template #item-1>
              <FieldElt id="name"
                v-model:value="article.name"
                @keyup.enter="updateArticle()"
                :info="val.INFO_NAME"
                :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="text">{{ val.LEGEND_TEXT }}</label>
              <Editor id="text"
                :api-key="val.TINY_KEY"
                v-model="article.text"
                :init="{ toolbar:
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
                :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt id="alt"
                type="textarea"
                v-model:value="article.alt"
                @keyup.enter="updateArticle()"
                :info="val.INFO_ALT">
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt id="cat"
                type="select"
                :list="val.CATS_ARTICLE"
                v-model:value="article.cat"
                @keyup.enter="updateArticle()"
                :info="val.INFO_CAT">
                <template #legend>{{ val.LEGEND_CAT }}</template>
                <template #label>{{ val.LABEL_CAT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt type="button"
            @click="updateArticle()" 
            class="btn-sky"
            :content="val.CONTENT_UPDATE"
            :title="val.TITLE_UPDATE + article.name">
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="deleteArticle()" 
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE + article.name">
            <template #btn>
              <i class="fa-solid fa-trash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-else
      itemscope 
      itemtype="https://schema.org/Article">
      <template #header>
        <h1 itemprop="name">{{ article.name }}</h1>
        <h2>{{ article.cat }}</h2>
      </template>

      <template #body>
        <BtnElt v-if="!checkSession('user')"
          id="likes"
          href="/login"
          class="btn-blue"
          :title="val.TITLE_LIKE_LOGIN + article.name">
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === false"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-blue"
          :title="val.TITLE_LIKE + article.name">
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt v-else-if="checkLikes() === true"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-sky"
          :title="val.TITLE_DISLIKE + article.name">
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <MediaElt v-if="article.image"
          :src="`/img/articles/${article.image}`"
          :alt="article.alt"
          :width="val.IMG_WIDTH"
          :height="val.IMG_HEIGHT"
          itemprop="image">
          <template #figcaption>
            <blockquote v-html="article.text" id="figcaption" class="blue"></blockquote>
            <p>
              {{ val.PUBLISHED_ON }}
              <i itemprop="dateCreated">{{ new Date(article.createdAt).toLocaleDateString() }}</i>
            </p>
          </template>
        </MediaElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRange, checkRole, deleteData, getData, putData, setError, setMeta } from "servidio"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ArticleView",
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, Editor },
  props: ["user", "val"],
  data() {
    return {
      article: {}
    }
  },

  created () {
    const { API_URL, HEAD, UI_URL } = this.val;

    getData(`${API_URL}/articles/${this.$route.params.id}`)
      .then((article => {
        article.likes = JSON.parse(article.likes);
        this.article  = article;

        setMeta(
          article.name + HEAD,
          (article.text || "").slice(0, 160).replace( /(<([^>]+)>)/gi, ""),
          `${UI_URL}/article/${article.id}`,
          `${UI_URL}/img/thumbnails/articles/${article.image}`
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
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * ? CHECK LIKES
     * * Check if the current user has liked the article.
     * @return {boolean} True if the user has liked the article, false otherwise.
     */
    checkLikes() {
      return this.article.likes && this.article.likes.includes(this.val.USER_ID);
    },

    /**
     * ? ADD LIKE
     * * Adds a like to the article.
     */
    addLike() {
      const { USER_ID, API_URL, TOKEN } = this.val;
      let { id, name, text, image, alt, likes, cat } = this.article;

      likes.includes(USER_ID) ? likes.splice(likes.indexOf(USER_ID), 1) : likes.push(USER_ID);

      const URL = `${API_URL}/articles/${id}`;
      const data = new FormData();

      data.append("name", name);
      data.append("text", text);
      data.append("image", image);
      data.append("alt", alt);
      data.append("likes", JSON.stringify(likes));
      data.append("cat", cat);

      putData(URL, data, TOKEN).catch(setError);
    },

    /**
     * ? UPDATE ARTICLE
     * * Updates the article with the provided data.
     */
    updateArticle() {
      const { CHECK_STRING, TEXT_MIN, TEXT_MAX, API_URL, TOKEN, ALERT_UPDATED } = this.val;
      let { id, name, text, image, alt, likes, cat } = this.article;

      if (checkRange(name, CHECK_STRING) &&
          checkRange(text, CHECK_STRING, TEXT_MIN, TEXT_MAX) &&
          checkRange(alt, CHECK_STRING)) {

        const URL   = `${API_URL}/articles/${id}`;
        const data  = new FormData();
        const img   = document.getElementById("image")?.files[0] ?? image;

        data.append("name", name);
        data.append("text", text);
        data.append("image", img);
        data.append("alt", alt);
        data.append("likes", JSON.stringify(likes));
        data.append("cat", cat);

        putData(URL, data, TOKEN)
          .then(() => {
            alert(name + ALERT_UPDATED);
            this.$router.go();
          })
          .catch(setError);
      }
    },

    /**
     * ? DELETE ARTICLE
     * * Deletes an article with the given ID.
     */
    deleteArticle() {
      const { TITLE_DELETE, API_URL, TOKEN, ALERT_DELETED } = this.val;
      let { id, name } = this.article;

      if (confirm(`${TITLE_DELETE} ${name} ?`) === true) {
        const URL = `${API_URL}/articles/${id}`

        deleteData(URL, TOKEN)
          .then(() => {
            alert(name + ALERT_DELETED);
            this.$router.go();
          })
          .catch(setError);
      }
    }
  }
}
</script>
