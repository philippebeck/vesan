<template>
  <main>
    <header>
      <h1>
        <i class="fa-regular fa-pen-to-square fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.EDITOR }}
      </h1>
    </header>

    <CardElt id="create-article">
      <template #header>
        <h2>{{ article.name }}</h2>
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
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"

import Editor from "@tinymce/tinymce-vue"

export default {
  name: "ArticleEditor",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt,
    Editor
  },

  props: ["constants"],
  data() {
    return {
      user: {}
    }
  },

  created() {
    if (this.constants.USER_ID) {
      this.$serve.fetchGet("/auth/" + this.constants.USER_ID)
        .then((res) => { 
          this.user = res;

          if (this.checkRole("editor")) {
            this.$store.dispatch("readArticle", this.$route.params.id);

            this.$serve.setMeta(
              this.constants.HEAD_ARTICLE, 
              this.constants.META_ARTICLE,
              this.constants.UI_URL,
              this.constants.UI_URL + this.constants.LOGO_SRC
            );
          }
        })
        .catch(err => { 
          this.$serve.checkError(err);
          this.$router.push("/admin");
        });

    } else {
      alert(this.constants.ALERT_HOME);
      this.$router.push("/");
    }
  },

  computed: {
    ...mapState(["article"])
  },

  methods: {
    ...mapActions(["readArticle"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * UPDATE ARTICLE
     */
    updateArticle() {
      if (this.$serve.checkString(this.article.name) && 
        this.$serve.checkString(this.article.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX) && 
        this.$serve.checkString(this.article.alt)) {

        let data  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.article.image;

        data.append("name", this.article.name);
        data.append("text", this.article.text);
        data.append("image", image);
        data.append("alt", this.article.alt);
        data.append("likes", this.article.likes);
        data.append("cat", this.article.cat);
        data.append("updated", Date.now());

        this.$serve.fetchPut(`/articles/${this.article._id}`, data)
          .then(() => {
            alert(this.article.name + this.constants.ALERT_UPDATED);
            this.$router.push("/admin");
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>