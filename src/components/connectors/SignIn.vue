<template>
  <form class="form">

    <!-- User Email -->
    <FieldElt id="email"
      v-model:value="email"
      info="Indicate your Email"
      @keyup.enter="login()"
      type="email">
      <template #legend>
        Email
      </template>
      <template #label>
        This email must have been registered before
      </template>
    </FieldElt>

    <!-- User Pass -->
    <FieldElt id="pass"
      v-model:value="pass"
      info="Indicate your Password"
      @keyup.enter="login()"
      type="password">
      <template #legend>
        Password
      </template>
      <template #label>
        You can use the Forgot Password feature if needed
      </template>
    </FieldElt>

    <!-- Security -->
    <div id="recaptcha"
      class="g-recaptcha"
      data-sitekey="">
    </div>

    <!-- Login Button -->
    <BtnElt type="button"
      content="Enter"
      @click="login()"
      class="btn-green">
      <template #btn>
        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
      </template>
    </BtnElt>
  </form>
</template>

<script>
export default {
  name: "SignIn",

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
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
