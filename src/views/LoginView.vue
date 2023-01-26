<template>

  <!-- LOGIN PAGE -->
  <CardElt v-if="isLogin">
    <template #header>
      <i class="violet anima-shrink fa-solid fa-sign-in-alt fa-2x"></i>
      <h1 class="violet anima-grow mar-none">Login</h1>
    </template>

    <template #body>
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

        <!-- Toggle Button to Forgot Password Page -->
        <BtnElt type="button"
          content="Forgot Password"
          @click="toggleFormType()"
          class="btn-orange"/>

        <!-- Login Button -->
        <BtnElt type="button"
          content="Login"
          @click="login()"
          class="btn-green"/>
      </form>
    </template>
  </CardElt>

  <!-- FORGOT PASSWORD PAGE -->
  <CardElt v-else>
    <template #header>
      <i class="violet anima-grow fa-solid fa-key fa-2x"></i>
      <h1 class="violet anima-shrink mar-none">Forgot Password</h1>
    </template>

    <template #body>
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

        <!-- Toggle Button to Login Page -->
        <BtnElt type="button"
          content="Login"
          @click="toggleFormType()"
          class="btn-green"/>

        <!-- Send Password Button -->
        <BtnElt type="button"
          content="Send"
          @click="forgotPass()"
          class="btn-orange"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      pass: "",
      isLogin: true
    }
  },

    beforeMount() {
    if (localStorage.userId) {
      this.$router.push("/admin");
    }
  },

  methods: {
    /**
     * TOGGLE FORM TYPE
     */
    toggleFormType() {
      if (this.isLogin) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },

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
    },

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
