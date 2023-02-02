<template>
  <form>
    <!-- User Email -->
    <FieldElt id="email"
      v-model:value="email"
      info="Indicate your Email"
      @keyup.enter="forgotPass()"
      type="email"
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
      content="Send"
      @click="forgotPass()"
      class="btn-orange">
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
