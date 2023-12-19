<template>
  <NavElt :items="val.NAV_MAIN">
    <template #brand>
      <img :src="val.LOGO_SRC" :alt="val.LOGO_ALT" :width="val.LOGO_WIDTH">
    </template>

    <template #profile>
      <a v-if="checkSession('user')" href="/profile" :title="val.PROFILE_OF + user.name">
        <img :src="`/img/thumbnails/users/${user.image}`"
          :alt="user.name"
          :height="40"
          :width="40"
          class="bord bord-circle">
      </a>

      <a v-else href="/login" :title="val.TITLE_LOGIN">
        <i class="fa-solid fa-right-to-bracket fa-fw"></i>
      </a>
    </template>
  </NavElt>

  <router-view v-slot="{ Component }" :val="val" :user="user">
    <transition name="slide">
      <component :is="Component" :key="$route.path"/>
    </transition>
  </router-view>

  <FootElt :title1="val.FOOT_TITLE1" :title2="val.FOOT_TITLE2" :title3="val.FOOT_TITLE3">
    <template #foot1>
      <ListElt :dynamic="true" :items="val.FOOT1">
        <template #items="slotProps">
          <a :href="slotProps.item.href" :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot2>
      <ListElt :dynamic="true" :items="val.FOOT2">
        <template #items="slotProps">
          <a :href="slotProps.item.href" :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot3>
      <ListElt :dynamic="true" :items="val.FOOT3">
        <template #items="slotProps">
          <a :href="slotProps.item.href" :title="slotProps.item.title">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot>
      <ListElt :dynamic="true" :items="val.FOOT">
        <template #items="slotProps">
          <a :href="slotProps.item.href" :title="slotProps.item.title">
            <i :class="`fa-brands fa-${slotProps.item.fa} fa-lg fa-fw ${slotProps.item.color}`"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
import FootElt from "@/assets/elements/FootElt"
import ListElt from "@/assets/elements/ListElt"
import NavElt from "@/assets/elements/NavElt"

import val from "./config/values"

import { checkRole, setGlobalMeta } from "servidio"
import { mapState, mapActions } from "vuex"

export default {
  name: 'App',
  components: {
    FootElt,
    ListElt,
    NavElt
  },

  data() {
    return {
      val: {}
    }
  },

  created() {
    this.val = val;
    setGlobalMeta(val.LANG, val.ICON);

    if (val.USER_ID) {
      this.$store.dispatch("readAvatar", val.USER_ID);
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
    checkSession(role) {
      return checkRole(this.user.role, role);
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
