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
            <i class="fa-solid fa-user-gear fa-fw"></i>
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
          <a :href="slotProps.href"
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
