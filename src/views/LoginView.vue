<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-right-to-bracket fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.LOGIN_VIEW }}
      </h1>
    </header>

    <CardElt v-if="type === 'SignUp'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-user-plus fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.SIGN_UP }}
        </h2>
        <p>{{ constants.INTRO_SIGNUP }}</p>
      </template>

      <template #body>
        <SignUp :constants="constants"/>

        <BtnElt type="button"
          @click="setType('SignIn')"
          class="btn-green"
          :content="constants.CONTENT_ENTER"
          :title="constants.TITLE_GO + constants.SIGN_IN">

          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('ForgotPass')"
          class="btn-orange"
          :content="constants.CONTENT_SEND"
          :title="constants.TITLE_GO + constants.FORGOT_PASS">

          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'SignIn'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-door-open fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.SIGN_IN }}
        </h2>
        <p>{{ constants.INTRO_SIGNIN }}</p>
      </template>

      <template #body>
        <SignIn :constants="constants"/>

        <BtnElt type="button"
          @click="setType('SignUp')"
          class="btn-sky-dark"
          :content="constants.CONTENT_SIGNUP"
          :title="constants.TITLE_GO + constants.SIGN_UP">

          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('ForgotPass')"
          class="btn-orange"
          :content="constants.CONTENT_SEND"
          :title="constants.TITLE_GO + constants.FORGOT_PASS">

          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'ForgotPass'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-key fa-lg"
            aria-hidden="true">
          </i>
          {{ constants.FORGOT_PASS }}
        </h2>
        <p>{{ constants.INTRO_FORGOT }}</p>
      </template>

      <template #body>
        <ForgotPass :constants="constants"/>

        <BtnElt type="button"
          @click="setType('SignUp')"
          class="btn-sky-dark"
          :content="constants.CONTENT_SIGNUP"
          :title="constants.TITLE_GO + constants.SIGN_UP">

          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('SignIn')"
          class="btn-green"
          :content="constants.CONTENT_ENTER"
          :title="constants.TITLE_GO + constants.SIGN_IN">

          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import serve from "../assets/serve"
import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import ForgotPass from "../components/ForgotPass"

export default {
  name: "LoginView",
  components: {
    BtnElt,
    CardElt,
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

  created() {
    serve.setMeta(
      this.constants.HEAD_LOGIN, 
      this.constants.META_LOGIN,
      this.constants.UI_URL + "/login",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );

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
