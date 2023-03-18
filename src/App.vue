<template>

  <!-- NAVBAR -->
  <NavElt :items="constants.NAV_MAIN">

    <!-- Brand Logo -->
    <template #brand>
      <img class="ani-slideB-it"
        :src="constants.LOGO_SRC"
        :alt="constants.LOGO_ALT"
        :width="constants.LOGO_WIDTH">
    </template>

    <!-- Admin Part -->
    <template #admin>

      <!-- Admin & Editor -->
      <ListElt v-if="checkRole('admin') || checkRole('editor')"
        :items="constants.NAV_ADMIN">

        <template #item-1>
          <a href="/admin"
            :title="constants.TITLE_ADMIN">
            <i class="fa-solid fa-gears fa-fw"></i>
          </a>
        </template>

        <template #item-2>
          <a href="/profile"
            :title="constants.PROFILE_OF + user.name">
            <img :src="`/img/thumbnails/users/${user.image}`"
              :alt="user.name"
              :height="40"
              :width="40"
              class="bord bord-circle">
          </a>
        </template>

        <template #item-3>
          <button type="button"
            @click="logout()"
            :title="constants.TITLE_LOGOUT">
            <i class="fa-solid fa-right-from-bracket fa-fw"></i>
          </button>
        </template>
      </ListElt>

      <!-- User -->
      <ListElt v-else-if="checkRole('user')"
        :items="constants.NAV_USER">

        <template #item-1>
          <a href="/profile"
            :title="constants.PROFILE_OF + user.name">
            <img :src="`/img/thumbnails/users/${user.image}`"
              :alt="user.name"
              :height="40"
              :width="40"
              class="bord bord-circle">
          </a>
        </template>

        <template #item-2>
          <button type="button"
            @click="logout()"
            :title="constants.TITLE_LOGOUT">
            <i class="fa-solid fa-arrow-left-to-bracket fa-fw"></i>
          </button>
        </template>
      </ListElt>

      <!-- Visitor -->
      <a v-else
        href="/login"
        :title="constants.TITLE_LOGIN">
        <i class="fa-solid fa-right-to-bracket fa-fw"></i>
      </a>
    </template>
  </NavElt>

  <!-- VIEWS -->
  <main>
    <router-view :constants="constants"/>
  </main>

  <!-- FOOTER -->
  <FootElt
    :title1="constants.FOOT_TITLE1"
    :title2="constants.FOOT_TITLE2"
    :title3="constants.FOOT_TITLE3">

    <!-- Websites -->
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

    <!-- Tools -->
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

    <!-- Links -->
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

    <!-- Social Networks -->
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
import constants from "/constants"

import ListElt from "@/assets/ListElt"
import NavElt from "@/assets/NavElt"
import FootElt from "@/assets/FootElt"

export default {
  name: 'App',
  components: {
    ListElt,
    NavElt,
    FootElt
  },

  data() {
    return {
      constants: {}
    }
  },

  created() {
    this.constants = constants;
    this.$serve.setGlobalMeta(constants.LANG, constants.TW_ID);

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
    },

    /**
     * LOGOUT
     */
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
      this.$router.go();
    }
  }
};
</script>
