<template>
  <form>

    <!-- User Email -->
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

    <!-- User Pass -->
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

    <!-- Login Button -->
    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
      <BtnElt type="button"
        @click="login()"
        class="btn-green"
        :content="constants.CONTENT_ENTER"
        :title="constants.TITLE_SIGNIN">

        <template #btn>
          <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        </template>
      </BtnElt>
    </vue-recaptcha>
  </form>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "SignIn",
  components: { VueRecaptcha },
  props: ["constants"],

  data() {
    return {
      email: "",
      pass: ""
    }
  },

  methods: {
    /**
     * USER LOGIN
     */
    login() {
      if (this.$serve.checkEmail(this.email) && 
        this.$serve.checkPass(this.pass)) {

        let auth = new FormData();
        auth.append("email", this.email);
        auth.append("pass", this.pass);

        this.$serve.postData("/api/users/login", auth)
          .then((res) => {

            let token   = JSON.stringify(res.token);
            let userId  = JSON.stringify(res.userId);

            localStorage.setItem("userToken", token);
            localStorage.setItem("userId", userId);

            this.$router.go("/");
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>
