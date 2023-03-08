<template>
  <CardElt v-if="type === 'SignUp'">
    <template #header>
      <h1 class="sky ani-turnXZ-it">
        <i class="fa-solid fa-sign-in-alt fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.SIGN_UP }}
      </h1>
      <p>{{ constants.INTRO_SIGNUP }}</p>
    </template>

    <template #body>
      <SignUp :constants="constants"/>

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        @click="setType('SignIn')"
        class="btn-green"
        :content="constants.SIGN_IN"
        :title="constants.TITLE_GO + constants.SIGN_IN">

        <template #btn>
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        @click="setType('ForgotPass')"
        class="btn-orange"
        :content="constants.FORGOT_PASS"
        :title="constants.TITLE_GO + constants.FORGOT_PASS">

        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'SignIn'">
    <template #header>
      <h1 class="sky ani-turnYZ-it">
        <i class="fa-solid fa-sign-in-alt fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.SIGN_IN }}
      </h1>
      <p>{{ constants.INTRO_SIGNIN }}</p>
    </template>

    <template #body>
      <SignIn :constants="constants"/>

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        @click="setType('SignUp')"
        class="btn-blue"
        :content="constants.SIGN_UP"
        :title="constants.TITLE_GO + constants.SIGN_UP">

        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to Forgot Password Component -->
      <BtnElt type="button"
        @click="setType('ForgotPass')"
        class="btn-orange"
        :content="constants.FORGOT_PASS"
        :title="constants.TITLE_GO + constants.FORGOT_PASS">

        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>

  <CardElt v-if="type === 'ForgotPass'">
    <template #header>
      <h1 class="sky ani-turn3D-it">
        <i class="fa-solid fa-key fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.FORGOT_PASS }}
      </h1>
      <p>{{ constants.INTRO_FORGOT }}</p>
    </template>

    <template #body>
      <ForgotPass :constants="constants"/>

      <!-- Toggle Button to SignUp Component -->
      <BtnElt type="button"
        @click="setType('SignUp')"
        class="btn-blue"
        :content="constants.SIGN_UP"
        :title="constants.TITLE_GO + constants.SIGN_UP">

        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>

      <!-- Toggle Button to SignIn Component -->
      <BtnElt type="button"
        @click="setType('SignIn')"
        class="btn-green"
        :content="constants.SIGN_IN"
        :title="constants.TITLE_GO + constants.SIGN_IN">

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

  props: ["constants"],
  data() {
    return {
      type: "SignIn"
    }
  },

  mounted() {
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
