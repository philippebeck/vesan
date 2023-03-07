<template>
  <form>
    <!-- Email -->
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

    <!-- Send -->
    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
      <BtnElt type="button"
        @click="forgotPass()"
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
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ForgotPass",
  components: { VueRecaptcha },
  props: ["constants"],

  data() {
    return {
      email: ""
    }
  },

  methods: {
    /**
     * FORGOT PASSWORD
     */
    forgotPass() {
      if (this.$serve.checkEmail(this.email) && confirm(this.constants.CONFIRM_FORGOT) === true) {
        let message = new FormData();

        message.append("email", this.email);
        message.append("subject", this.constants.FORGOT_SUBJECT);
        message.append("html", this.constants.FORGOT_TEXT);

        this.$serve.postData("/api/auth/pass", message)
          .then(() => {
            alert(message.get("subject") + this.constants.ALERT_SENDED);
            this.$router.push("/login");
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
          });
      }
    }
  }
}
</script>
