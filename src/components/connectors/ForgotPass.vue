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
export default {
  name: "ForgotPass",
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
      if (this.email && this.$serve.checkEmail(this.email)) {
        let email = new FormData();
        email.append("email", this.email);

        this.$serve.postData("/api/users/email", email)
          .then((name) => {
            if (confirm(name + this.constants.FORGOT_CONFIRM)) {
              this.forgotPass();
            }
          })
          .catch(() => { alert(this.constants.FORGOT_EMAIL) });

      } else {
        alert("Fill a referenced email to receive a new password");
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
