<template>
  <main>
    <CardElt>
      <template #header>
        <h1 class="sky-dark">
          <i class="fa-regular fa-images fa-lg"></i>
          {{ val.GALLERY_VIEW }}
        </h1>
        <b>{{ val.INTRO_GALLERY }}</b>
      </template>

      <template #body>
        <ListElt :items="galleries"
          :dynamic="true"
          class="grid-2md-3lg-4wd content-center">

          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item.id}`"
              :title="val.TITLE_WATCH + slotProps.item.name">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`" 
                :alt="`${slotProps.item.name}`" 
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT">
                <template #figcaption>
                  {{ slotProps.item.name }}
                </template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <GalleryCreator :val="val"/>
        <GalleryManager v-if="galleries.length > 0"
          :val="val"
          :galleries="galleries"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"

import GalleryCreator from "@/assets/creators/GalleryCreator"
import GalleryManager from "@/assets/managers/GalleryManager"

import { checkRole, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: "GalleryView",
  components: {
    CardElt,
    ListElt,
    MediaElt,
    GalleryCreator,
    GalleryManager
  },
  props: ["val", "user"],

  created() {
    this.$store.dispatch("listGalleries");

    setMeta(
      this.val.HEAD_GALLERY, 
      this.val.META_GALLERY,
      this.val.UI_URL + "/galleries",
      this.val.UI_URL + this.val.LOGO_SRC
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
