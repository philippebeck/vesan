<template>
  <form>
    <!-- User Email -->
    <FieldElt id="email"
      type="email"
      v-model:value="email"
      @keyup.enter="checkEmail()"
      :info="constants.CREATE_EMAIL"
      required>

      <template #legend>
        {{ constants.LEGEND_EMAIL }}
      </template>
      <template #label>
        {{ constants.LABEL_EMAIL }}
      </template>
    </FieldElt>

    <!-- Security -->
    <div id="recaptcha"
      class="g-recaptcha"
      data-sitekey="">
    </div>

    <!-- Send Password Button -->
    <BtnElt type="button"
      @click="checkEmail()"
      class="btn-orange"
      :content="constants.CONTENT_SEND"
      :title="constants.BUTTON_FORGOT">

      <template #btn>
        <i class="fa-regular fa-paper-plane fa-lg"></i>
      </template>
    </BtnElt>
  </form>
</template>

<script>
import constants from "/constants";

export default {
  name: "ForgotPass",

  data() {
    return {
      constants: {},
      email: ""
    }
  },

  mounted() {
    this.constants = constants;
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
            if (confirm(name + constants.FORGOT_CONFIRM)) {
              this.forgotPass();
            }
          })
          .catch(() => { alert(constants.FORGOT_EMAIL) });
      }
    },

    /**
     * FORGOT PASSWORD
     */
    forgotPass() {
      let message = new FormData();

      message.append("email", this.email);
      message.append("subject", constants.FORGOT_SUBJECT);
      message.append("html", constants.FORGOT_TEXT);

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
