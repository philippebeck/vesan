<template>
  <main id="top">
    <NavElt :items="getCategories" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last v-if="checkSession('editor')">
        <a href="#article-set" :title="val.ARTICLE_MANAGER">
          <i class="fa-regular fa-pen-to-square fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt :isArticle="true" class="container-90lg">
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-solid fa-blog fa-lg"></i>
          {{ val.BLOG_VIEW }}
        </h1>
        <p>{{ val.INTRO_ARTICLE }}</p>
      </template>

      <template #body>
        <ListElt :items="getItemsByCategory(articles)" :dynamic="true">
          <template #items="slotProps">
            <h2 :id="slotProps.item[0].cat" class="sky-dark ani-turnXZ-loop-altrev-into">
              {{ slotProps.item[0].cat }}
            </h2>
          </template>

          <template #nested="slotProps">
            <CardElt itemscope itemtype="https://schema.org/Article" class="blog">
              <template #header>
                <h3 itemprop="name" class="sky-dark">{{ slotProps.value.name }}</h3>
              </template>

              <template #body>
                <BtnElt
                  v-if="!checkSession('user')"
                  :id="`like-${slotProps.value.id}`"
                  href="/login"
                  class="btn-sky-dark"
                  :title="val.TITLE_LIKE_LOGIN + slotProps.value.name"
                >
                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <BtnElt
                  v-else-if="checkLikes(slotProps.value.id) === false"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="val.TITLE_LIKE + slotProps.value.name"
                >
                  <template #btn>
                    <i class="fa-regular fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <BtnElt
                  v-else-if="checkLikes(slotProps.value.id) === true"
                  :id="`like-${slotProps.value.id}`"
                  type="button"
                  @click="addLike(slotProps.value.id)"
                  class="btn-sky"
                  :title="val.TITLE_DISLIKE + slotProps.value.name"
                >
                  <template #btn>
                    <i class="fa-solid fa-thumbs-up fa-lg fa-fw"></i>
                    <b itemprop="contentRating">{{ slotProps.value.likes.length }}</b>
                  </template>
                </BtnElt>

                <a
                  v-if="!slotProps.value.url || checkSession('editor')"
                  :href="`article/${slotProps.value.id}`"
                  :title="val.TITLE_READ + slotProps.value.name"
                >
                  <MediaElt
                    :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`"
                    :alt="`${slotProps.value.alt}`"
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image"
                  >
                    <template #figcaption>
                      <p v-html="slotProps.value.text.split(':')[0]"></p>
                    </template>
                  </MediaElt>
                </a>

                <a
                  v-else
                  :href="`https://${slotProps.value.url}`"
                  :title="val.TITLE_READ + slotProps.value.name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaElt
                    :id="`${slotProps.value.name.toLowerCase()}-${slotProps.value.cat.toLowerCase()}`"
                    :src="`img/thumbnails/articles/${slotProps.value.image}`"
                    :alt="`${slotProps.value.alt}`"
                    :width="val.THUMB_WIDTH"
                    :height="val.THUMB_HEIGHT"
                    itemprop="image"
                  >
                    <template #figcaption>
                      <p v-html="slotProps.value.text.split(':')[0]" class="blog"></p>
                    </template>
                  </MediaElt>
                </a>
              </template>
            </CardElt>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('editor')">
        <ArticleSet :token="token" :val="val" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import ArticleSet from '../components/ArticleSet.vue'
import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'

import { checkRole, getCats, getItemsByCat, putData, setError, setMeta } from '../assets/services'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BlogView',
  components: { BtnElt, CardElt, ListElt, MediaElt, NavElt, ArticleSet },
  props: ['avatar', 'val'],

  /**
   * ? CREATED
   * * A function that retrieves the articles & sets the meta data of the page.
   *
   * @returns {Promise<any>}
   */
  async created(): Promise<any> {
    const { HEAD_BLOG, LOGO_SRC, META_BLOG, UI_URL } = this.val as {
      HEAD_BLOG: string
      LOGO_SRC: string
      META_BLOG: string
      UI_URL: string
    }

    await this.$store.dispatch('listArticles')
    setMeta(HEAD_BLOG, META_BLOG, `${UI_URL}/blog`, UI_URL + LOGO_SRC)
  },

  /**
   * ? UPDATED
   * * A function that updates the text elements by setting the "itemprop" attribute to "text".
   *
   * @returns {void}
   */
  updated() {
    const textArray: HTMLCollectionOf<Element> = document.getElementsByClassName('figcaption')

    for (let textElt of textArray) {
      if (textElt?.firstChild) {
        ;(textElt.firstChild as Element).setAttribute('itemprop', 'text')
      }
    }
  },

  computed: {
    ...mapState(['articles', 'id', 'token']),

    /**
     * ? GET CATEGORIES
     * * Retrieves the categories of articles.
     *
     * @return {string[]} An array of article categories.
     */
    getCategories(): string[] {
      return getCats(this.articles)
    }
  },

  methods: {
    ...mapActions(['listArticles']),

    /**
     * ? CHECK SESSION
     * * Checks the session for the specified role.
     *
     * @param {string} role - the role to check
     * @return {boolean} the result of the role check
     */
    checkSession(role: string): boolean {
      return checkRole(this.avatar.role, role)
    },

    /**
     * ? GET ITEMS BY CATEGORY
     * * Retrieves items by category.
     *
     * @param {{id: string, name: string, cat: string}[]} items - The array of items.
     * @return {Record<string, { id: string; name: string }[]>} The items filtered by category.
     */
    getItemsByCategory(
      items: { id: string; name: string; cat: string }[]
    ): Record<string, { id: string; name: string }[]> {
      return getItemsByCat(items)
    },

    /**
     * ? CHECK LIKES
     * * Check if the given ID is present in the likes array of any user article.
     *
     * @param {number} id - The ID to check for in the likes array.
     * @return {boolean} - Returns a boolean indicating whether the ID is present in the likes array.
     */
    checkLikes(id: number): boolean {
      return this.articles.some((a: { id: number; likes: number[] }) => a.id === id && a.likes.includes(this.id))
    },

    /**
     * ? ADD LIKE
     * * Asynchronously adds a like to the specified article.
     *
     * @param {number} id - The ID of the article to add a like to
     * @returns {Promise<void>} A promise that resolves when the like is added.
     */
    async addLike(id: number): Promise<void> {
      const { API_URL }: { API_URL: string } = this.val
      const article:
        | {
            id: number
            name: string
            text: string
            image: string
            alt: string
            url: string
            likes: number[]
            cat: string
          }
        | undefined = this.articles.find((a: { id: number }) => a.id === id)

      if (!article) return
      let {
        name,
        text,
        image,
        alt,
        url,
        likes,
        cat
      }: { name: string; text: string; image: string; alt: string; url: string; likes: number[]; cat: string } = article

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
    }
  }
}
</script>

<style>
.blog {
  --ve-card-width: 350px;
}

.blog h3 {
  height: 120px;
}
</style>
