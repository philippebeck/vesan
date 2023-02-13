<template>
  <form>
    <!-- User Email -->
    <FieldElt id="email"
      type="email"
      v-model:value="email"
      @keyup.enter="forgotPass()"
      info="Indicate your Email"
      required>
      <template #legend>
        Email
      </template>
      <template #label>
        This email must have been registered before
      </template>
    </FieldElt>

    <!-- Security -->
    <div id="recaptcha"
      class="g-recaptcha"
      data-sitekey="">
    </div>

    <!-- Send Password Button -->
    <BtnElt type="button"
      @click="forgotPass()"
      class="btn-orange"
      content="Send"
      title="Send a new password">
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
      email: ""
    }
  },

  methods: {
    /**
     * FORGOT PASSWORD
     */
    forgotPass() {
      if (this.$serve.checkEmail(this.email) && 
        confirm(constants.FORGOT_CONFIRM)) {

        let message = new FormData();
        message.append("email", this.email);
        message.append("subject", constants.FORGOT_SUBJECT);
        message.append("text", constants.FORGOT_TEXT);

        this.$serve.postData("/api/users/forgot", message)
          .then(() => {
            alert(message.get("subject") + " sended !");
            this.$router.push("/login");
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
