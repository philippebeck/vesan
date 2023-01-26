<template>

  <!-- NAVBAR -->
  <NavElt :items="['home', 'contact']">

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
    <template #contact>
      <i class="fa-brands fa-at fa-fw"></i>
    </template>

    <!-- Admin Part -->
    <template #admin>

      <!-- Visitor -->
      <ul v-if="!userId">
        <li>
          <a href="https://paypal.me/philippebeck"
            title="Donation">
            <i class="fa-brands fa-paypal fa-fw"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/sponsors/philippebeck"
            title="Sponsor">
            <i class="fa-regular fa-heart fa-fw"></i>
          </a>
        </li>
        <li>
          <a href="/login"
            title="Login">
            <i class="fa-solid fa-sign-in-alt fa-fw"></i>
          </a>
        </li>
      </ul>

      <!-- Admin -->
      <ul v-else>
        <li>
          <a href="/admin"
            title="Admin">
            <i class="fa-solid fa-user-ninja fa-fw"></i>
          </a>
        </li>
        <li>
          <button type="button"
            @click="logout()"
            title="Logout">
            <i class="fa-solid fa-sign-out-alt fa-fw"></i>
          </button>
        </li>
      </ul>
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
      <ul>
        <li>
          <a href="https://asperger.philippebeck.net"
            title="Tests for Asperger's Syndrome">
            Asperger
          </a>
        </li>
        <li>
          <a href="https://astronomy.philippebeck.net"
            title="NASA & CDS APIs">
            Astronomy
          </a>
        </li>
      </ul>
    </template>

    <!-- Tools -->
    <template #foot2>
      <ul>
        <li>
          <a href="https://www.npmjs.com/package/servidio"
            title="Vuejs SFC Library">
            Vue-Elt
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/servidio"
            title="JavaScript Frontend Services">
            Servidio
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/animadio"
            title="Animadio CSS Library">
            Animadio
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/nemjs"
            title="JavaScript Backend Services">
            Nemjs
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/vesan"
            title="CMS with Vue-Elt, Servidio, Animadio & NemJS">
            Vesan
          </a>
        </li>
      </ul>
    </template>

    <!-- Links -->
    <template #foot3>
      <ul>
        <li>
          <a href="https://links2code.philippebeck.net"
            title="Links For Coding">
            Links2Code
          </a>
        </li>
        <li>
          <a href="https://philippebeck.net"
            title="Portal">
            Philippe Beck
          </a>
        </li>
      </ul>
    </template>

    <!-- Social Networks -->
    <template #foot>
      <ul>
        <li>
          <a href="https://github.com/philippebeck"
            title="Philippe Beck @GitHub">
            <i class="fa-brands fa-github fa-2x fa-fw black"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/ph_beck"
            title="Philippe Beck @Twitter">
            <i class="fa-brands fa-twitter fa-2x fa-fw sky"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/philippebeck"
            title="Philippe Beck @LinkedIn">
            <i class="fa-brands fa-linkedin-in fa-2x fa-fw blue"></i>
          </a>
        </li>
        <li>
          <a href="https://codepen.io/philippebeck"
            title="Philippe Beck @CodePen">
            <i class="fa-brands fa-codepen fa-2x fa-fw black"></i>
          </a>
        </li>
      </ul>
    </template>
  </FootElt>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      userId: null
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    }
  },

  mounted() {
    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  }
};
</script>
