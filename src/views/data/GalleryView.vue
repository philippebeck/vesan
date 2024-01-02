<template>
  <main id="top">
    <NavElt v-if="checkSession('admin')" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last>
        <a href="#gallery-set" :title="val.GALLERY_MANAGER">
          <i class="fa-solid fa-images fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt itemscope itemtype="https://schema.org/CreativeWork">
      <template #header>
        <h1 class="sky-dark" itemprop="name">
          <i class="fa-regular fa-images fa-lg"></i>
          {{ val.GALLERY_VIEW }}
        </h1>
        <b>{{ val.INTRO_GALLERY }}</b>
      </template>

      <template #body>
        <ListElt :items="galleries"
          :dynamic="true"
          class="grid-2sm-3md-4lg-5xl-6wd content-center">
          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item.id}`" 
              :title="val.TITLE_WATCH + slotProps.item.name"
              itemprop="url">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`" 
                :alt="val.COVER_OF + slotProps.item.name" 
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT">
                <template #figcaption>
                  <p class="gallery">{{ slotProps.item.name }}</p>
                </template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <GallerySet :galleries="galleries" :images="images" :token="token" :val="val"/>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRole, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import CardElt from "@/assets/elements/CardElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import NavElt from "@/assets/elements/NavElt"
import GallerySet from "@/assets/setters/GallerySet"

export default {
  name: "GalleryView",
  components: { CardElt, ListElt, MediaElt, NavElt, GallerySet },
  props: ["avatar", "val"],

  created() {
    const { HEAD_GALLERY, LOGO_SRC, META_GALLERY, UI_URL } = this.val;
    this.$store.dispatch("listGalleries");
    this.$store.dispatch("listImages");

    setMeta(HEAD_GALLERY, META_GALLERY, `${UI_URL}/galleries`, UI_URL + LOGO_SRC);
  },

  computed: {
    ...mapState(["galleries", "images", "token"]),
  },

  methods: {
    ...mapActions(["listGalleries", "listImages"]),

    /**
     * ? CHECK SESSION
     * Checks the session for a given role.
     * @param {type} role - the role to check the session for
     * @return {type} the result of the session check
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role);
    }
  }
}
</script>
