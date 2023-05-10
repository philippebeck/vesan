<template>
  <form>
    <FieldElt id="email"
      type="email"
      v-model:value="email"
      :info="constants.INFO_EMAIL">

      <template #legend>
        {{ constants.LEGEND_EMAIL }}
      </template>
      <template #label>
        {{ constants.LABEL_EMAIL }}
      </template>
    </FieldElt>

    <FieldElt id="pass"
      type="password"
      v-model:value="pass"
      :info="constants.INFO_PASSWORD">

      <template #legend>
        {{ constants.LEGEND_PASSWORD }}
      </template>
      <template #label>
        {{ constants.LABEL_PASSWORD }}
      </template>
    </FieldElt>

    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY"
      @verify="onVerify">
      <BtnElt type="button"
        class="btn-green"
        :content="constants.CONTENT_ENTER"
        :title="constants.TITLE_SIGNIN">

        <template #btn>
          <i class="fa-solid fa-door-open fa-lg"></i>
        </template>
      </BtnElt>
    </vue-recaptcha>
  </form>
</template>

<script>
import { checkError, checkRegex, fetchSet } from "../assets/serve"

import BtnElt from "../assets/BtnElt"
import FieldElt from "../assets/FieldElt"
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "SignIn",
  components: {  
    BtnElt,
    FieldElt,
    VueRecaptcha 
  },

  props: ["constants"],
  data() {
    return {
      email: "",
      pass: ""
    }
  },

  methods: {
    /**
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      const EMAIL_MSG   = this.constants.CHECK_EMAIL;
      const EMAIL_REGEX = this.constants.REGEX_EMAIL;
      const PASS_MSG    = this.constants.CHECK_PASS;
      const PASS_REGEX  = this.constants.REGEX_PASS;

      if (checkRegex(this.email, EMAIL_MSG, EMAIL_REGEX) && 
          checkRegex(this.pass, PASS_MSG, PASS_REGEX)) {

        const URL   = this.constants.API_URL + "/auth/recaptcha";
        let options = {
          method: "POST",
          mode: "cors",
          body: { response: response }
        };

        fetchSet(URL, options)
          .then(result => {
            if (result.success) {
              this.signIn();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => { 
            checkError(err);
            this.$router.go();
          });
      }
    },

    /**
     * USER SIGN IN
     */
    signIn() {
      let auth = new FormData();
      auth.append("email", this.email);
      auth.append("pass", this.pass);

      const URL   = this.constants.API_URL + "/auth";
      let options = {
        method: "POST",
        mode: "cors",
        body: auth
      };

      fetchSet(URL, options)
        .then((res) => {

          let token   = JSON.stringify(res.token);
          let userId  = JSON.stringify(res.userId);

          localStorage.setItem("userToken", token);
          localStorage.setItem("userId", userId);

          this.$router.go();
        })
        .catch(err => { checkError(err) });
    }
  }
}
</script>
