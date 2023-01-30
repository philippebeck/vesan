<template>

  <!-- NAVBAR -->
  <NavElt :items="['home', 'shop', 'blog', 'contact']">

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

    <!-- Admin Part -->
    <template #admin>

      <!-- Visitor -->
      <ListElt v-if="!userId"
        :items="['paypal', 'github', 'login']">

        <template #item-1>
          <a href="https://paypal.me/philippebeck"
            title="Donation">
            <i class="fa-brands fa-paypal fa-fw"></i>
          </a>
        </template>

        <template #item-2>
          <a href="https://github.com/sponsors/philippebeck"
            title="Sponsor">
            <i class="fa-regular fa-heart fa-fw"></i>
          </a>
        </template>

        <template #item-3>
          <a href="/login"
            title="Login">
            <i class="fa-solid fa-sign-in-alt fa-fw"></i>
          </a>
        </template>
      </ListElt>

      <!-- Admin -->
      <ListElt v-else
        :items="['admin', 'logout']">

        <template #item-1>
          <a href="/admin"
            title="Admin">
            <i class="fa-solid fa-user-ninja fa-fw"></i>
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
      <ListElt :items="['Asperger', 'Astronomy']">
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
      <ListElt :items="['Links2Code', 'Philippe Beck']">
        <template #item-1>
          <a href="https://links2code.philippebeck.net"
            title="Links For Coding">
            Links2Code
          </a>
        </template>
        <template #item-2>
          <a href="https://philippebeck.net"
            title="Portal">
            Philippe Beck
          </a>
        </template>
      </ListElt>
    </template>

    <!-- Social Networks -->
    <template #foot>
      <ListElt :items="['GitHub', 'Twitter', 'LinkedIn', 'CodePen']">
        <template #item-1>
          <a href="https://github.com/philippebeck"
            title="Philippe Beck @GitHub">
            <i class="fa-brands fa-github fa-2x fa-fw black"></i>
          </a>
        </template>
        <template #item-2>
          <a href="https://twitter.com/ph_beck"
            title="Philippe Beck @Twitter">
            <i class="fa-brands fa-twitter fa-2x fa-fw sky"></i>
          </a>
        </template>
        <template #item-3>
          <a href="https://www.linkedin.com/in/philippebeck"
            title="Philippe Beck @LinkedIn">
            <i class="fa-brands fa-linkedin-in fa-2x fa-fw blue"></i>
          </a>
        </template>
        <template #item-4>
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
