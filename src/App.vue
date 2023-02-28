<template>

  <!-- NAVBAR -->
  <NavElt :items="constants.NAV_MAIN">

    <!-- Brand Logo -->
    <template #brand>
      <img class="anima-slideB"
        :src="constants.LOGO_SRC"
        :alt="constants.LOGO_ALT">
    </template>

    <!-- Main Part -->
    <template #home>
      <i class="fa-solid fa-laptop-house fa-fw"></i>
    </template>
    <template #shop>
      <i class="fa-solid fa-shop fa-fw"></i>
    </template>
    <template #blog>
      <i class="fa-solid fa-blog fa-fw"></i>
    </template>
    <template #contact>
      <i class="fa-brands fa-at fa-fw"></i>
    </template>
    <template #basket>
      <i class="fa-solid fa-basket-shopping fa-fw"></i>
    </template>

    <!-- Admin Part -->
    <template #admin>

      <!-- Admin & Editor -->
      <ListElt v-if="checkRole('admin') || checkRole('editor')"
        :items="constants.NAV_ADMIN">

        <template #item-1>
          <a href="/admin"
            title="Admin">
            <i class="fa-solid fa-user-ninja fa-fw"></i>
          </a>
        </template>

        <template #item-2>
          <a href="/profile"
            :title="`Profile of ${user.name}`">
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
            title="Logout">
            <i class="fa-solid fa-sign-out-alt fa-fw"></i>
          </button>
        </template>
      </ListElt>

      <!-- User -->
      <ListElt v-else-if="checkRole('user')"
        :items="constants.NAV_USER">

        <template #item-1>
          <a href="/profile"
            :title="`Profile of ${user.name}`">
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
            title="Logout">
            <i class="fa-solid fa-sign-out-alt fa-fw"></i>
          </button>
        </template>
      </ListElt>

      <!-- Visitor -->
      <a v-else
        href="/login"
        title="Login">
        <i class="fa-solid fa-sign-in-alt fa-fw"></i>
      </a>
    </template>
  </NavElt>

  <!-- VIEWS -->
  <main>
    <router-view :constants="constants"/>
  </main>

  <!-- FOOTER -->
  <FootElt>

    <!-- Websites -->
    <template #foot1>
      <ListElt :items="constants.FOOT1">
        <template #item-1>
          <a href="https://asperger.philippebeck.net"
            title="Tests for Asperger's Syndrome">
            Asperger
          </a>
        </template>
        <template #item-2>
          <a href="https://astronomy.philippebeck.net"
            title="NASA & CDS APIs">
            Astronomy
          </a>
        </template>
        <template #item-3>
          <a href="https://philippebeck.net"
            title="Portal">
            Philippe Beck
          </a>
        </template>
      </ListElt>
    </template>

    <!-- Tools -->
    <template #foot2>
      <ListElt :items="constants.FOOT2">
        <template #item-1>
          <a href="https://www.npmjs.com/package/vue-elt"
            title="Vuejs SFC Library">
            Vue-Elt
          </a>
        </template>
        <template #item-2>
          <a href="https://www.npmjs.com/package/servidio"
            title="JavaScript Frontend Services">
            Servidio
          </a>
        </template>
        <template #item-3>
          <a href="https://www.npmjs.com/package/animadio"
            title="Animadio CSS Library">
            Animadio
          </a>
        </template>
        <template #item-4>
          <a href="https://www.npmjs.com/package/nemjs"
            title="JavaScript Backend Services">
            Nemjs
          </a>
        </template>
        <template #item-5>
          <a href="https://www.npmjs.com/package/vesan"
            title="CMS with Vue-Elt, Servidio, Animadio & NemJS">
            Vesan
          </a>
        </template>
      </ListElt>
    </template>

    <!-- Links -->
    <template #foot3>
      <ListElt :items="constants.FOOT3">
        <template #item-1>
          <a href="/link"
            title="Find links for coding">
            Links for Dev
          </a>
        </template>
        <template #item-2>
          <a href="/legal"
            title="Read the legal notice">
            Legal Notice
          </a>
        </template>
        <template #item-3>
          <a href="https://paypal.me/philippebeck"
            title="Donation @Philippe Beck">
            Donation
          </a>
        </template>
        <template #item-4>
          <a href="https://github.com/sponsors/philippebeck"
            title="Sponsor @Philippe Beck">
            Sponsor
          </a>
        </template>
      </ListElt>
    </template>

    <!-- Social Networks & Contributions -->
    <template #foot>
      <ListElt :items="constants.FOOT">
        <template #item-1>
          <a href="https://github.com/philippebeck"
            title="Philippe Beck @GitHub">
            <i class="fa-brands fa-github fa-lg fa-fw black"></i>
          </a>
        </template>
        <template #item-2>
          <a href="https://www.linkedin.com/in/philippebeck"
            title="Philippe Beck @LinkedIn">
            <i class="fa-brands fa-linkedin-in fa-lg fa-fw blue"></i>
          </a>
        </template>
        <template #item-3>
          <a href="https://medium.com/@philippebeck"
            title="Philippe Beck @Medium">
            <i class="fa-brands fa-medium fa-lg fa-fw green"></i>
          </a>
        </template>
        <template #item-4>
          <a href="https://www.npmjs.com/~philippebeck"
            title="Philippe Beck @NPM">
            <i class="fa-brands fa-npm fa-lg fa-fw red"></i>
          </a>
        </template>
        <template #item-5>
          <a href="https://twitter.com/ph_beck"
            title="Philippe Beck @Twitter">
            <i class="fa-brands fa-twitter fa-lg fa-fw sky"></i>
          </a>
        </template>
        <template #item-6>
          <a href="https://codepen.io/philippebeck"
            title="Philippe Beck @CodePen">
            <i class="fa-brands fa-codepen fa-lg fa-fw black"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
import { mapState, mapActions } from "vuex"
import constants from "/constants"

export default {
  name: 'App',

  data() {
    return {
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;

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
