<template>
  <CardElt v-if="type === 'SignUp'">
    <template #header>
      <h1 class="sky anima-turnXZ">
        <i class="fa-solid fa-sign-in-alt fa-lg"
          aria-hidden="true">
        </i>
        Sign Up
      </h1>
    </template>

    <template #body>
      <SignUp />

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        @click="setType('SignIn')"
        class="btn-green"
        content="SignIn"
        title="Go to SignIn">
        <template #btn>
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        @click="setType('ForgotPass')"
        class="btn-orange"
        content="ForgotPass"
        title="Go to ForgotPass">
        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'SignIn'">
    <template #header>
      <h1 class="sky anima-turnYZ">
        <i class="fa-solid fa-sign-in-alt fa-lg"
          aria-hidden="true">
        </i>
        Sign In
      </h1>
    </template>

    <template #body>
      <SignIn />

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        @click="setType('SignUp')"
        class="btn-blue"
        content="SignUp"
        title="Go to SignUp">
        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        @click="setType('ForgotPass')"
        class="btn-orange"
        content="ForgotPass"
        title="Go to ForgotPass">
        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'ForgotPass'">
    <template #header>
      <h1 class="sky anima-turn3D">
        <i class="fa-solid fa-key fa-lg"
          aria-hidden="true">
        </i>
        Forgot Password
      </h1>
    </template>

    <template #body>
      <ForgotPass />

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        @click="setType('SignUp')"
        class="btn-blue"
        content="SignUp"
        title="Go to SignUp">
        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        @click="setType('SignIn')"
        class="btn-green"
        content="SignIn"
        title="Go to SignIn">
        <template #btn>
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>
</template>

<script>
import SignUp from "@/components/connectors/SignUp"
import SignIn from "@/components/connectors/SignIn"
import ForgotPass from "@/components/connectors/ForgotPass"

export default {
  name: "LoginView",
  components: {
    SignUp,
    SignIn,
    ForgotPass
  },

  data() {
    return {
      type: "SignIn"
    }
  },

    beforeMount() {
    if (localStorage.userId) {
      this.$router.push("/");
    }
  },

  methods: {
    /**
     * TOGGLE FORM TYPE
     */
    setType(type) {
      this.type = type;
    },
  }
}
</script>
