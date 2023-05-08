<template>
  <form>
    <FieldElt type="email"
      v-model:value="email"
      :info="constants.INFO_EMAIL"
      required>

      <template #legend>
        {{ constants.LEGEND_EMAIL }}
      </template>
      <template #label>
        {{ constants.LABEL_EMAIL }}
      </template>
    </FieldElt>

    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY"
      @verify="onVerify">
      <BtnElt type="button"
        class="btn-orange"
        :content="constants.CONTENT_SEND"
        :title="constants.TITLE_FORGOT">

        <template #btn>
          <i class="fa-regular fa-paper-plane fa-lg"></i>
        </template>
      </BtnElt>
    </vue-recaptcha>
  </form>
</template>

<script>
import BtnElt from "../assets/BtnElt"
import FieldElt from "../assets/FieldElt"

import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ForgotPass",
  components: { 
    BtnElt,
    FieldElt,
    VueRecaptcha 
  },

  props: ["constants"],
  data() {
    return {
      email: ""
    }
  },

  methods: {
    /**
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      let emailMsg    = this.constants.CHECK_EMAIL;
      let emailRegex  = this.constants.REGEX_EMAIL;

      if (this.$serve.checkRegex(this.email, emailMsg, emailRegex)) {

        let url = this.constants.API_URL + "/auth/recaptcha";
        let options = {
          method: "POST",
          mode: "cors",
          body: { response: response }
        };

        this.$serve.fetchSet(url, options)
          .then(result => {
            if (result.success) {
              this.forgotPass();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => { 
            this.$serve.checkError(err);
            this.$router.go();
          });
      }
    },

    /**
     * FORGOT PASSWORD
     */
    forgotPass() {
      if (confirm(this.constants.CONFIRM_FORGOT) === true) {
        let message = new FormData();

        message.append("email", this.email);
        message.append("subject", this.constants.FORGOT_SUBJECT);
        message.append("html", this.constants.FORGOT_TEXT);

        let url = this.constants.API_URL + "/auth/pass";
        let options = {
          method: "POST",
          mode: "cors",
          body: message
        };

        this.$serve.fetchSet(url, options)
          .then(() => {
            alert(message.get("subject") + this.constants.ALERT_SENDED);
            this.$router.push("/login");
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
