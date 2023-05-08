<template>
  <NavElt :items="constants.NAV_MAIN">
    <template #brand>
      <img :src="constants.LOGO_SRC"
        :alt="constants.LOGO_ALT"
        :width="constants.LOGO_WIDTH">
    </template>

    <template #admin>
      <a v-if="checkRole('user')"
        href="/profile"
        :title="constants.PROFILE_OF + user.name">
        <img :src="`/img/thumbnails/users/${user.image}`"
          :alt="user.name"
          :height="40"
          :width="40"
          class="bord bord-circle">
      </a>

      <a v-else
        href="/login"
        :title="constants.TITLE_LOGIN">
        <i class="fa-solid fa-right-to-bracket fa-fw"></i>
      </a>
    </template>
  </NavElt>

  <router-view v-slot="{ Component }"
    :constants="constants"
    :user="user">
    <transition name="slide">
      <component :is="Component" 
        :key="$route.path"/>
    </transition>
  </router-view>

  <FootElt
    :title1="constants.FOOT_TITLE1"
    :title2="constants.FOOT_TITLE2"
    :title3="constants.FOOT_TITLE3">

    <template #foot1>
      <ListElt :dynamic="true"
        :items="constants.FOOT1">
        <template #items="slotProps">
          <a :href="slotProps.item.href"
            :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot2>
      <ListElt :dynamic="true"
        :items="constants.FOOT2">
        <template #items="slotProps">
          <a :href="slotProps.item.href"
            :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot3>
      <ListElt :dynamic="true"
        :items="constants.FOOT3">
        <template #items="slotProps">
          <a :href="slotProps.item.href"
            :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot>
      <ListElt :dynamic="true"
        :items="constants.FOOT">
        <template #items="slotProps">
          <a :href="slotProps.item.href"
            :title="slotProps.item.title">
            <i :class="`fa-brands fa-${slotProps.item.fa} fa-lg fa-fw ${slotProps.item.color}`"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "../constants"

import FootElt from "./assets/FootElt"
import ListElt from "./assets/ListElt"
import NavElt from "./assets/NavElt"

export default {
  name: 'App',
  components: {
    FootElt,
    ListElt,
    NavElt
  },

  data() {
    return {
      constants: {}
    }
  },

  created() {
    this.constants = constants;
    this.$serve.setGlobalMeta(
      this.constants.TW_ID, 
      this.constants.ICON, 
      this.constants.LANG);

    if (constants.USER_ID) {
      this.$store.dispatch("readAvatar", constants.USER_ID);
    }
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    ...mapActions(["readAvatar"]),

    /**
     * CHECK ROLE
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    }
  }
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 500ms, transform 500ms;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>
