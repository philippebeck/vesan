<template>

  <!-- NAVBAR -->
  <NavElt :items="['home', 'shop', 'blog', 'contact', 'basket']">

    <!-- Brand Logo -->
    <template #brand>
      <img class="anima-slideB"
        src="/img/logo.svg"
        alt="Logo Phi">
    </template>

    <!-- Main Part -->
    <template #home>
      <i class="fa-solid fa-home fa-fw"></i>
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

      <!-- Admin -->
      <ListElt v-if="checkSession('admin') || checkSession('editor')"
        :items="['admin', 'profile', 'logout']">

        <template #item-1>
          <a href="/admin"
            title="Admin">
            <i class="fa-solid fa-user-ninja fa-fw"></i>
          </a>
        </template>

        <template #item-2>
          <a href="/profile"
            :title="`${user.name} Profile`">
            <img :src="`/img/thumbnails/users/${user.image}`"
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

      <!-- Author & User -->
      <ListElt v-else-if="checkSession('user')"
        :items="['profile', 'logout']">

        <template #item-1>
          <a href="/profile"
            :title="`${user.name} Profile`">
            <img :src="`/img/thumbnails/users/${user.image}`"
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

  <!-- MAIN -->
  <main>
    <router-view/>
  </main>
  

  <!-- FOOTER -->
  <FootElt>

    <!-- Websites -->
    <template #foot1>
      <ListElt :items="['Asperger', 'Astronomy', 'Philippe Beck']">
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
      <ListElt :items="['Vue-Elt', 'Servidio', 'Animadio', 'NemJS', 'Vesan']">
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
      <ListElt :items="['Links', 'Legal Notice']">
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
      </ListElt>
    </template>

    <!-- Social Networks & Contributions -->
    <template #foot>
      <ListElt :items="['GitHub', 'LinkedIn', 'Sponsor', 'Twitter', 'Donation', 'CodePen']">
        <template #item-1>
          <a href="https://github.com/philippebeck"
            title="Philippe Beck @GitHub">
            <i class="fa-brands fa-github fa-2x fa-fw black"></i>
          </a>
        </template>
        <template #item-2>
          <a href="https://www.linkedin.com/in/philippebeck"
            title="Philippe Beck @LinkedIn">
            <i class="fa-brands fa-linkedin-in fa-2x fa-fw blue"></i>
          </a>
        </template>
        <template #item-3>
          <a href="https://github.com/sponsors/philippebeck"
            title="Sponsor @Philippe Beck">
            <i class="fa-regular fa-heart fa-2x fa-fw pink"></i>
          </a>
        </template>
        <template #item-4>
          <a href="https://twitter.com/ph_beck"
            title="Philippe Beck @Twitter">
            <i class="fa-brands fa-twitter fa-2x fa-fw sky"></i>
          </a>
        </template>
        <template #item-5>
          <a href="https://paypal.me/philippebeck"
            title="Donation @Philippe Beck">
            <i class="fa-brands fa-paypal fa-2x fa-fw blue"></i>
          </a>
        </template>
        <template #item-6>
          <a href="https://codepen.io/philippebeck"
            title="Philippe Beck @CodePen">
            <i class="fa-brands fa-codepen fa-2x fa-fw black"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
import constants from "/constants"

export default {
  name: 'App',

  data() {
    return {
      users: [],
      user: {}
    }
  },

  mounted() {
    this.$serve.getData("/api/users/check")
      .then(res => { 
        this.users = res;

        for (const user of this.users) {
          if (user._id === constants.USER_ID) {

            this.$serve.getData("/api/users/" + user._id)
              .then(res => { this.user = res; })
              .catch(err => { console.log(err) });
          }
        }
      })
      .catch(err => { console.log(err) });
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.users, role);
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
