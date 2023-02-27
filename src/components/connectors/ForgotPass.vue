<template>
  <form>
    <!-- User Email -->
    <FieldElt id="email"
      type="email"
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

    <!-- Send Password -->
    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
      <BtnElt type="button"
        @click="checkEmail()"
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
     * CHECK EMAIL
     */
    checkEmail() {
      if (this.$serve.checkEmail(this.email)) {
        let email = new FormData();
        email.append("email", this.email);

        this.$serve.postData("/api/users/email", email)
          .then((name) => {
            if (confirm(name + this.constants.FORGOT_CONFIRM)) {
              this.forgotPass();
            }
          })
          .catch(() => { alert(this.constants.FORGOT_EMAIL) });
      }
    },

    /**
     * FORGOT PASSWORD
     */
    forgotPass() {
      let message = new FormData();

      message.append("email", this.email);
      message.append("subject", this.constants.FORGOT_SUBJECT);
      message.append("html", this.constants.FORGOT_TEXT);

      this.$serve.postData("/api/users/password", message)
        .then(() => {
          alert(message.get("subject") + " sended !");
          this.$router.push("/login");
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>
