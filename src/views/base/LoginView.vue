<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        {{ val.LOGIN_VIEW }}
      </h1>
    </header>

    <CardElt v-if="type === 'SignUp'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-user-plus fa-lg"></i>
          {{ val.SIGN_UP }}
        </h2>
        <p>{{ val.INTRO_SIGNUP }}</p>
      </template>

      <template #body>
        <UserSet :val="val"/>

        <BtnElt type="button"
          @click="setType('SignIn')"
          class="btn-green"
          :content="val.CONTENT_ENTER"
          :title="val.TITLE_GO + val.SIGN_IN">
          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('ForgotPass')"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS">
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'SignIn'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-door-open fa-lg"></i>
          {{ val.SIGN_IN }}
        </h2>
        <p>{{ val.INTRO_SIGNIN }}</p>
      </template>

      <template #body>
        <AuthSet type="signin" :val="val"/>

        <BtnElt type="button"
          @click="setType('SignUp')"
          class="btn-sky-dark"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('ForgotPass')"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS">
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'ForgotPass'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-key fa-lg"></i>
          {{ val.FORGOT_PASS }}
        </h2>
        <p>{{ val.INTRO_FORGOT }}</p>
      </template>

      <template #body>
        <AuthSet type="forgot" :val="val"/>

        <BtnElt type="button"
          @click="setType('SignUp')"
          class="btn-sky-dark"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('SignIn')"
          class="btn-green"
          :content="val.CONTENT_ENTER"
          :title="val.TITLE_GO + val.SIGN_IN">
          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"

import AuthSet from "@/assets/setters/AuthSet"
import UserSet from "@/assets/setters/UserSet"

import { setMeta } from "servidio"

export default {
  name: "LoginView",
  components: {
    BtnElt,
    CardElt,
    AuthSet,
    UserSet
  },

  props: ["val"],
  data() {
    return {
      type: "SignIn"
    }
  },

  created() {
    setMeta(
      this.val.HEAD_LOGIN, 
      this.val.META_LOGIN,
      this.val.UI_URL + "/login",
      this.val.UI_URL + this.val.LOGO_SRC
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
