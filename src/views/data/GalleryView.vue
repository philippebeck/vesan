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
        <ListElt :items="galleries" :dynamic="true" class="grid-2md-3lg-4wd content-center">
          <template #items="slotProps">
            <a :href="`gallery/${slotProps.item.id}`" :title="val.TITLE_WATCH + slotProps.item.name">

              <MediaElt :id="`${slotProps.item.name.toLowerCase()}`"
                :src="`/img/thumbnails/galleries/${slotProps.item.cover}`" 
                :alt="val.COVER_OF + slotProps.item.name" 
                :width="val.THUMB_WIDTH"
                :height="val.THUMB_HEIGHT">
                <template #figcaption>{{ slotProps.item.name }}</template>
              </MediaElt>
            </a>
          </template>
        </ListElt>
      </template>

      <template #aside v-if="checkSession('admin')">
        <GallerySet :galleries="galleries" :token="token" :val="val"/>
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
import GallerySet from "@/assets/setters/GallerySet"

export default {
  name: "GalleryView",
  components: { CardElt, ListElt, MediaElt, GallerySet },
  props: ["avatar", "val"],

  created() {
    const { HEAD_GALLERY, LOGO_SRC, META_GALLERY, UI_URL } = this.val;
    this.$store.dispatch("listGalleries");

    setMeta(HEAD_GALLERY, META_GALLERY, `${UI_URL}/galleries`, UI_URL + LOGO_SRC);
  },

  computed: {
    ...mapState(["galleries", "token"]),
  },

  methods: {
    ...mapActions(["listGalleries"]),

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
