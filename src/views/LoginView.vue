<template>
  <CardElt v-if="type === 'SignUp'">
    <template #header>
      <i class="blue anima-turnXZ fa-solid fa-sign-in-alt fa-2x"></i>
      <h1 class="sky anima-turnY">Sign Up</h1>
    </template>

    <template #body>
      <SignUp />

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        content="SignIn"
        @click="setType('SignIn')"
        class="btn-green">
        <template #btn>
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        content="ForgotPass"
        @click="setType('ForgotPass')"
        class="btn-orange">
        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'SignIn'">
    <template #header>
      <i class="blue anima-turnYZ fa-solid fa-sign-in-alt fa-2x"></i>
      <h1 class="sky anima-turn">Sign In</h1>
    </template>

    <template #body>
      <SignIn />

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        content="SignUp"
        @click="setType('SignUp')"
        class="btn-blue">
        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        content="ForgotPass"
        @click="setType('ForgotPass')"
        class="btn-orange">
        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'ForgotPass'">
    <template #header>
      <i class="blue anima-turnXY fa-solid fa-key fa-2x"></i>
      <h1 class="sky anima-turnX">Forgot Password</h1>
    </template>

    <template #body>
      <ForgotPass />

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        content="SignUp"
        @click="setType('SignUp')"
        class="btn-blue">
        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        content="SignIn"
        @click="setType('SignIn')"
        class="btn-green">
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
