<template>
  <main>
    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-images fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.GALLERY_VIEW }}
        </h1>
        <b>{{ constants.INTRO_GALLERY }}</b>
      </template>

      <template #body>
        <ListElt :items="galleries"
          :dynamic="true"
          class="grid-2md-3lg-4wd content-center">

          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item._id}`"
              :title="constants.TITLE_WATCH + slotProps.item.name">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`" 
                :alt="`${slotProps.item.name}`" 
                :width="constants.THUMB_WIDTH"
                :height="constants.THUMB_HEIGHT">

                <template #figcaption>
                  {{ slotProps.item.name }}
                </template>

              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <GalleryCreator :constants="constants"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import GalleryCreator from "@/assets/creators/GalleryCreator"
import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"

import { checkRole, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "GalleryView",
  components: {
    CardElt,
    ListElt,
    MediaElt,
    GalleryCreator
  },
  props: ["constants", "user"],

  created() {
    this.$store.dispatch("listGalleries");

    setMeta(
      this.constants.HEAD_GALLERY, 
      this.constants.META_GALLERY,
      this.constants.UI_URL + "/galleries",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  computed: {
    ...mapState(["galleries"]),
  },

  methods: {
    ...mapActions(["listGalleries"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return checkRole(this.user.role, role);
    }
  }
}
</script>
