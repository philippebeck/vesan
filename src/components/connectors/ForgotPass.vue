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
import BtnElt from "@/assets/BtnElt"
import FieldElt from "@/assets/FieldElt"

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
      if (this.$serve.checkEmail(this.email)) {

        this.$serve.fetchPost('/auth/recaptcha', { response: response })
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

        this.$serve.fetchPost("/auth/pass", message)
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
