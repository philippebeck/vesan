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
              <FieldElt
                id="name"
                v-model:value="article.name"
                @keyup.enter="updateArticle()"
                :info="val.INFO_NAME"
                :min="2"
              >
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <label for="text">{{ val.LEGEND_TEXT }}</label>
              <Editor id="text" :api-key="val.TINY_KEY" v-model="article.text" :init="val.TINY_INIT" />
            </template>

            <template #item-3>
              <MediaElt v-if="article.image" :src="'/img/thumbnails/articles/' + article.image" :alt="article.alt" />

              <FieldElt id="image" type="file" v-model:value="image" :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt
                id="alt"
                type="textarea"
                v-model:value="article.alt"
                @keyup.enter="updateArticle()"
                :info="val.INFO_ALT"
              >
                <template #legend>{{ val.LEGEND_ALT }}</template>
                <template #label>{{ val.LABEL_ALT }}</template>
              </FieldElt>
            </template>

            <template #item-5>
              <FieldElt id="url" v-model:value="article.url" @keyup.enter="updateArticle()" :info="val.INFO_URL">
                <template #legend>{{ val.LEGEND_URL }}</template>
                <template #label>{{ val.LABEL_URL }}</template>
              </FieldElt>
            </template>

            <template #item-6>
              <FieldElt
                id="cat"
                type="select"
                :list="val.CATS_ARTICLE"
                v-model:value="article.cat"
                @keyup.enter="updateArticle()"
                :info="val.INFO_CAT"
              >
                <template #legend>{{ val.LEGEND_CAT }}</template>
                <template #label>{{ val.LABEL_CAT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt
            type="button"
            @click="updateArticle()"
            class="btn-sky"
            :content="val.CONTENT_UPDATE"
            :title="val.TITLE_UPDATE + article.name"
          >
            <template #btn>
              <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt
            type="button"
            @click="deleteArticle()"
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE + article.name"
          >
            <template #btn>
              <i class="fa-solid fa-trash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>

    <CardElt v-else itemscope itemtype="https://schema.org/Article">
      <template #header>
        <h1 itemprop="name">{{ article.name }}</h1>
        <h2>{{ article.cat }}</h2>
      </template>

      <template #body>
        <BtnElt
          v-if="!checkSession('user')"
          id="likes"
          href="/login"
          class="btn-blue"
          :title="val.TITLE_LIKE_LOGIN + article.name"
        >
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt
          v-else-if="checkLikes() === false"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-blue"
          :title="val.TITLE_LIKE + article.name"
        >
          <template #btn>
            <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <BtnElt
          v-else-if="checkLikes() === true"
          id="likes"
          type="button"
          @click="addLike()"
          class="btn-sky"
          :title="val.TITLE_DISLIKE + article.name"
        >
          <template #btn>
            <i class="fa-solid fa-thumbs-up fa-lg fa-fw"></i>
            <b v-if="article.likes" itemprop="contentRating">
              {{ article.likes.length }}
            </b>
          </template>
        </BtnElt>

        <MediaElt
          v-if="article.image"
          :src="`/img/articles/${article.image}`"
          :alt="article.alt"
          :width="val.IMG_WIDTH"
          :height="val.IMG_HEIGHT"
          itemprop="image"
        >
          <template #figcaption>
            <section v-html="article.text" id="figcaption"></section>
            <p>
              {{ val.PUBLISHED_ON }}
              <time itemprop="dateCreated" :datetime="article.createdAt">
                {{ new Date(article.createdAt).toLocaleDateString() }}
              </time>
            </p>
          </template>
        </MediaElt>
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { checkRange, checkRegex, checkRole, deleteData, getData, putData, setError, setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import FieldElt from '../components/FieldElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import Editor from '@tinymce/tinymce-vue'

interface Article {
  id: number
  name: string
  text: string
  image: string
  alt: string
  url: string
  likes: any
  cat: string
  createdAt: string
  updatedAt: string
}

interface Val {
  ALERT_DELETED: string
  API_URL: string
  ALERT_UPDATED: string
  CHECK_STRING: string
  HEAD: string
  REGEX_URL: RegExp
  TEXT_MAX: number
  TEXT_MIN: number
  TITLE_DELETE: string
  UI_URL: string
}

export default defineComponent({
  name: 'ArticleView',
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, Editor },
  props: ['avatar', 'val'],

  data() {
    return {
      id: 0 as number,
      token: '' as string,
      article: {
        id: 0,
        name: '',
        text: '',
        image: '',
        alt: '',
        url: '',
        likes: null,
        cat: '',
        createdAt: '',
        updatedAt: ''
      } as Article
    }
  },

  /**
   * ? CREATED
   * * Retrieves the article from the API
   * * Sets the meta tags
   *
   * @return {Promise<void>} A promise that gets an "article"
   */
  async created(): Promise<void> {
    const { API_URL, HEAD, UI_URL }: Val = this.val

    try {
      const article: Article = await getData(`${API_URL}/articles/${this.$route.params.id}`)

      article.likes = JSON.parse(article.likes)
      this.article = article

      setMeta(
        article.name + HEAD,
        (article.text || '').slice(0, 160).replace(/(<([^>]+)>)/gi, ''),
        `${UI_URL}/article/${article.id}`,
        `${UI_URL}/img/thumbnails/articles/${article.image}`
      )
    } catch (err) {
      setError(err)
      this.$router.push('/blog')
    }
  },

  /**
   * ? UPDATED
   * * A function that updates the text element's itemprop attribute
   * * if the "figcaption" element is present.
   *
   * @returns {void}
   */
  updated(): void {
    if (document.getElementById('figcaption')) {
      const textElt: HTMLElement | null = document.getElementById('figcaption')

      if (textElt?.firstChild) {
        ;(textElt.firstChild as HTMLElement).setAttribute('itemprop', 'text')
      }
    }
  },

  computed: { ...mapState(['id', 'token']) },

  methods: {
    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     *
     * @param {string} role - The role to check.
     * @return {boolean} The result of the session check.
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? CHECK LIKES
     * Check if the current user has liked the article.
     *
     * @returns {boolean|false} - True if the user has liked the article, false otherwise.
     */
    checkLikes(): boolean | false {
      if (Array.isArray(this.article.likes)) {
        return this.article.likes.includes(this.id)
      } else {
        return false
      }
    },

    /**
     * ? ADD LIKE
     * * Adds a like to the article.
     *
     * @return {Promise<void>} A promise that resolves when the like is added.
     */
    async addLike(): Promise<void> {
      const { API_URL }: Val = this.val
      let { id, name, text, image, alt, url, likes, cat }: Article = this.article

      const index: number = likes.indexOf(this.id)
      index > -1 ? likes.splice(index, 1) : likes.push(this.id)

      const URL: string = `${API_URL}/articles/${id}`
      const data: FormData = new FormData()

      data.append('name', name)
      data.append('text', text)
      data.append('image', image)
      data.append('alt', alt)
      data.append('url', url)
      data.append('likes', JSON.stringify(likes))
      data.append('cat', cat)

      try {
        await putData(URL, data, this.token)
      } catch (err) {
        setError(err)
      }
    },

    /**
     * ? UPDATE ARTICLE
     * * Updates the article with the provided data.
     *
     * @returns {Promise<void>} A promise that resolves when the article is updated.
     */
    async updateArticle(): Promise<void> {
      const { API_URL, ALERT_UPDATED, CHECK_STRING, REGEX_URL, TEXT_MAX, TEXT_MIN }: Val = this.val
      let { id, name, text, image, alt, url, likes, cat }: Article = this.article

      const IS_NAME_CHECKED: boolean = checkRange(name, CHECK_STRING)
      const IS_TEXT_CHECKED: boolean = checkRange(text, CHECK_STRING, TEXT_MIN, TEXT_MAX)
      const IS_ALT_CHECKED: boolean = checkRange(alt, CHECK_STRING)
      const IS_URL_CHECKED: boolean = url ? checkRegex(url, CHECK_STRING, REGEX_URL) : true

      if (IS_NAME_CHECKED && IS_TEXT_CHECKED && IS_ALT_CHECKED && IS_URL_CHECKED) {
        const URL: string = `${API_URL}/articles/${id}`

        const data: FormData = new FormData()
        const img: File | string = (document.getElementById('image') as HTMLInputElement)?.files?.[0] ?? image

        data.append('name', name)
        data.append('text', text)
        data.append('image', img)
        data.append('alt', alt)
        data.append('url', url)
        data.append('likes', JSON.stringify(likes))
        data.append('cat', cat)

        try {
          await putData(URL, data, this.token)
          alert(name + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.push('/blog')
        }
      }
    },

    /**
     * ? DELETE ARTICLE
     * * Deletes an article with the given ID.
     *
     * @returns {Promise<void>} A promise that resolves when the article is deleted.
     */
    async deleteArticle(): Promise<void> {
      const { ALERT_DELETED, API_URL, TITLE_DELETE }: Val = this.val
      let { id, name }: Article = this.article

      if (confirm(`${TITLE_DELETE} ${name} ?`)) {
        const URL: string = `${API_URL}/articles/${id}`

        try {
          await deleteData(URL, this.token)
          alert(name + ALERT_DELETED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.push('/blog')
        }
      }
    }
  }
})
</script>

<style>
.tox {
  margin: auto;
  max-width: 1000px;
}
</style>
