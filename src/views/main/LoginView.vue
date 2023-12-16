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
        <form>
          <FieldElt type="email"
            v-model:value="email"
            :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <FieldElt type="password"
            v-model:value="pass"
            :info="val.INFO_PASSWORD">
            <template #legend>{{ val.LEGEND_PASSWORD }}</template>
            <template #label>{{ val.LABEL_PASSWORD }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-green"
              :content="val.CONTENT_ENTER"
              :title="val.TITLE_SIGNIN">
              <template #btn>
                <i class="fa-solid fa-door-open fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

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
        <form>
          <FieldElt type="email"
            v-model:value="email"
            :info="val.INFO_EMAIL"
            required>
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-orange"
              :content="val.CONTENT_SEND"
              :title="val.TITLE_FORGOT">
              <template #btn>
                <i class="fa-regular fa-paper-plane fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

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
import { checkRegex, postData, setError } from "servidio"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"

import UserSet from "@/assets/setters/UserSet"

import { VueRecaptcha } from "vue-recaptcha";
import { setMeta } from "servidio"

export default {
  name: "LoginView",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    UserSet,
    VueRecaptcha
  },

  props: ["val"],
  data() {
    return {
      email: "",
      pass: "",
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

    /**
     * ? ON VERIFY
     * Checks the validity of the given response 
     * and performs signin if successful
     *
     * @param {any} response - The response to verify.
     */
    onVerify(response) {
      const { CHECK_EMAIL, REGEX_EMAIL, CHECK_PASS, REGEX_PASS, API_URL } = this.val;

      if (this.type === "signin" &&
          checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL) && 
          checkRegex(this.pass, CHECK_PASS, REGEX_PASS)
          ||
          this.type === "forgot" &&
          checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)) {

        const URL = `${API_URL}/auth/recaptcha`;

        postData(URL, { response })
          .then(result => {
            if (result.success) {
              this.signIn();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => { 
            setError(err);
            this.$router.go();
          });
      }
    },

    /**
     * ? SIGN IN
     * Signs in the user.
     */
    signIn() {
      const URL   = `${this.val.API_URL}/auth`;
      const data  = new FormData();

      data.append("email", this.email);
      data.append("pass", this.pass);

      postData(URL, data)
        .then((res) => {
          localStorage.setItem("userToken", JSON.stringify(res.token));
          localStorage.setItem("userId", JSON.stringify(res.userId));

          this.$router.go();
        })
        .catch(err => { setError(err) });
    },

    /**
     * ? FORGOT PASS
     * Executes the forgot password functionality.
     */
    forgotPass() {
      const { CONFIRM_FORGOT, API_URL, FORGOT_SUBJECT, FORGOT_TEXT, ALERT_SENDED } = this.val;

      if (confirm(CONFIRM_FORGOT) === true) {
        const URL   = `${API_URL}/auth/pass`;
        const data  = new FormData();

        data.append("email", this.email);
        data.append("subject", FORGOT_SUBJECT);
        data.append("html", FORGOT_TEXT);

        postData(URL, data)
          .then(() => {
            alert(FORGOT_SUBJECT + ALERT_SENDED);
            this.$router.push("/login");
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
