<template>
  <form>

    <!-- User Email -->
    <FieldElt id="email"
      type="email"
      v-model:value="email"
      @keyup.enter="login()"
      :info="constants.CREATE_EMAIL">

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
      @keyup.enter="login()"
      :info="constants.CREATE_PASSWORD">

      <template #legend>
        {{ constants.LEGEND_PASSWORD }}
      </template>
      <template #label>
        {{ constants.LABEL_PASSWORD }}
      </template>
    </FieldElt>

    <!-- Security -->
    <div id="recaptcha"
      class="g-recaptcha"
      data-sitekey="">
    </div>

    <!-- Login Button -->
    <BtnElt type="button"
      @click="login()"
      class="btn-green"
      :content="constants.CONTENT_ENTER"
      :title="constants.BUTTON_SIGNIN">

      <template #btn>
        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
      </template>
    </BtnElt>
  </form>
</template>

<script>
export default {
  name: "SignIn",
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
          .catch(() => { alert(this.constants.FORGOT_CREDENTIALS) });
      }
    }
  }
}
</script>
