<template>
  <NavElt :items="val.NAV_MAIN">
    <template #brand>
      <img :src="val.LOGO_SRC" :alt="val.LOGO_ALT" :width="val.LOGO_WIDTH">
    </template>

    <template #profile>
      <a v-if="checkSession('user')" href="/profile" :title="val.PROFILE_OF + avatar.name">
        <img :src="`/img/thumbnails/users/${avatar.image}`"
          :alt="avatar.name"
          :height="40"
          :width="40"
          class="bord bord-circle">
      </a>

      <a v-else href="/login" :title="val.TITLE_LOGIN">
        <i class="fa-solid fa-right-to-bracket fa-fw"></i>
      </a>
    </template>
  </NavElt>

  <router-view v-slot="{ Component }" :val="val" :avatar="avatar">
    <component :is="Component" :key="$route.path"/>
  </router-view>

  <FootElt class="ani-slideT-it"
    :title1="val.FOOT_TITLE1" 
    :title2="val.FOOT_TITLE2" 
    :title3="val.FOOT_TITLE3">
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
          <a :href="slotProps.item.href" 
            :title="slotProps.item.title"
            target="_blank"
            rel="noopener noreferrer">
            {{ slotProps.item.content }}
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot>
      <ListElt :dynamic="true" :items="val.FOOT">
        <template #items="slotProps">
          <a :href="slotProps.item.href" 
            :title="slotProps.item.title"
            :aria-label="slotProps.item.title"
            target="_blank"
            rel="noopener noreferrer">
            <i :class="`fa-brands fa-${slotProps.item.fa} fa-lg fa-fw ${slotProps.item.color}`"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
import { checkRole, setGlobalMeta } from "servidio"
import { mapState, mapActions } from "vuex"

import FootElt from "@/assets/elements/FootElt"
import ListElt from "@/assets/elements/ListElt"
import NavElt from "@/assets/elements/NavElt"

import val from "./config/values"

export default {
  name: 'App',
  components: { FootElt, ListElt, NavElt },
  data() {
    return {
      val: {}
    }
  },

  created() {
    this.$store.dispatch("readId");
    this.$store.dispatch("readToken");

    this.val = val;
    setGlobalMeta(val.LANG, val.ICON);

    if (this.token) this.$store.dispatch("readAvatar", this.id);
  },

  computed: {
    ...mapState(["avatar", "id", "token"]),
  },

  methods: {
    ...mapActions(["readId", "readToken", "readAvatar"]),

    /**
     * ? CHECK SESSION
     * * Checks the session for a specific role.
     * @param {type} role - the role to check
     * @return {type} the result of the check
     */
    checkSession(role) {
      return checkRole(this.avatar.role, role);
    }
  }
};
</script>
