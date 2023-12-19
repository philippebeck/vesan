<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
        {{ val.LOGIN_VIEW }}
      </h1>
    </header>

    <CardElt v-if="type === 'signUp'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-user-plus fa-lg"></i>
          {{ val.SIGN_UP }}
        </h2>
        <p>{{ val.INTRO_SIGNUP }}</p>
      </template>

      <template #body>
        <form enctype="multipart/form-data">

          <FieldElt id="name"
            v-model:value="name"
            :info="val.INFO_NAME"
            :min="2">
            <template #legend>{{ val.LEGEND_NAME }}</template>
            <template #label>{{ val.LABEL_NAME }}</template>
          </FieldElt>

          <FieldElt id="email"
            type="email"
            v-model:value="email"
            :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <FieldElt id="image"
            type="file"
            v-model:value="image"
            :info="val.INFO_IMAGE">
            <template #legend>{{ val.LEGEND_IMAGE }}</template>
            <template #label>{{ val.LABEL_IMAGE }}</template>
          </FieldElt>

          <FieldElt id="pass"
            type="password"
            v-model:value="pass"
            :info="val.INFO_PASSWORD">
            <template #legend>{{ val.LEGEND_PASSWORD }}</template>
            <template #label>{{ val.LABEL_PASSWORD }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-blue"
              :content="val.CONTENT_SIGNUP"
              :title="val.TITLE_SIGNUP">
              <template #btn>
                <i class="fa-solid fa-user-plus fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt type="button"
            @click="setType('signIn')"
            class="btn-green"
            :content="val.CONTENT_ENTER"
            :title="val.TITLE_GO + val.SIGN_IN">
            <template #btn>
              <i class="fa-solid fa-door-open fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="setType('forgotPass')"
            class="btn-orange"
            :content="val.CONTENT_SEND"
            :title="val.TITLE_GO + val.FORGOT_PASS">
            <template #btn>
              <i class="fa-regular fa-paper-plane fa-lg"></i>
            </template>
          </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'signIn'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-door-open fa-lg"></i>
          {{ val.SIGN_IN }}
        </h2>
        <p>{{ val.INTRO_SIGNIN }}</p>
      </template>

      <template #body>
        <form>
          <FieldElt id="email"
            type="email"
            v-model:value="email"
            :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <FieldElt id="pass"
            type="password"
            v-model:value="pass"
            :info="val.INFO_PASSWORD">
            <template #legend>{{ val.LEGEND_PASSWORD }}</template>
            <template #label>{{ val.LABEL_PASSWORD }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-green"
              :content="val.CONTENT_ENTER"
              :title="val.TITLE_SIGNIN">
              <template #btn>
                <i class="fa-solid fa-door-open fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt type="button"
          @click="setType('signUp')"
          class="btn-sky-dark"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('forgotPass')"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS">
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-if="type === 'forgotPass'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-key fa-lg"></i>
          {{ val.FORGOT_PASS }}
        </h2>
        <p>{{ val.INTRO_FORGOT }}</p>
      </template>

      <template #body>
        <form>
          <FieldElt id="email"
            type="email"
            v-model:value="email"
            :info="val.INFO_EMAIL"
            required>
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-orange"
              :content="val.CONTENT_SEND"
              :title="val.TITLE_FORGOT">
              <template #btn>
                <i class="fa-regular fa-paper-plane fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt type="button"
          @click="setType('signUp')"
          class="btn-sky-dark"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="setType('signIn')"
          class="btn-green"
          :content="val.CONTENT_ENTER"
          :title="val.TITLE_GO + val.SIGN_IN">
          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRange, checkRegex, postData, setError, setMeta } from "servidio"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "LoginView",
  components: { BtnElt, CardElt, FieldElt, VueRecaptcha },
  props: ["val"],
  data() {
    return {
      email: "",
      pass: "",
      type: "signIn"
    }
  },

  created() {
    setMeta(
      this.val.HEAD_LOGIN, 
      this.val.META_LOGIN,
      this.val.UI_URL + "/login",
      this.val.UI_URL + this.val.LOGO_SRC
    );

    if (localStorage.userId) this.$router.push("/");
  },

  methods: {
    /**
     * ? SET TYPE
     * * Set the type of the object.
     * @param {type} type - the new type of the object
     */
    setType(type) {
      this.type = type;
    },

    /**
     * ? ON VERIFY
     * * Handles the verification response.
     * @param {type} response - the verification response
     */
    onVerify(response) {
      const { CHECK_EMAIL, CHECK_STRING, REGEX_EMAIL, CHECK_PASS, REGEX_PASS, API_URL } = this.val;

      if (
        this.type === "signUp" && checkRange(this.name, CHECK_STRING) && 
        checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL) && checkRegex(this.pass, CHECK_PASS, REGEX_PASS)
        ||
        this.type === "signIn" && checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL) && 
        checkRegex(this.pass, CHECK_PASS, REGEX_PASS)
        ||
        this.type === "forgot" && checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)
      ) {
        const URL = `${API_URL}/auth/recaptcha`;

        postData(URL, { response })
          .then(result => {
            const { success } = result;

            if      (success && this.type === "signUp") this.createUser();
            else if (success && this.type === "signIn") this.signIn();
            else if (success && this.type === "forgot") this.forgotPass();
            else alert("Failed captcha verification");
          })
          .catch(err => { 
            setError(err);
            this.$router.go();
          });
      }
    },

    /**
     * ? CREATE USER
     * * Creates a new user.
     */
    createUser() {
      const { API_URL, ALERT_CREATED, ALERT_IMG } = this.val;

      const URL   = `${API_URL}/users`;
      const data  = new FormData();
      const img   = document.getElementById("image")?.files[0];

      if (img !== undefined) {
        data.append("name", this.name);
        data.append("email", this.email);
        data.append("image", img);
        data.append("pass", this.pass);
        data.append("role", "user");

        postData(URL, data)
          .then(() => {
            alert(this.name + ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { setError(err) });

      } else {
        alert(ALERT_IMG);
      }
    },

    /**
     * ? SIGN IN
     * * Signs in the user.
     */
    signIn() {
      const URL   = `${this.val.API_URL}/auth`;
      const data  = new FormData();

      data.append("email", this.email);
      data.append("pass", this.pass);

      postData(URL, data)
        .then((res) => {
          localStorage.setItem("userToken", JSON.stringify(res.token));
          localStorage.setItem("userId", JSON.stringify(res.userId));

          this.$router.go();
        })
        .catch(setError);
    },

    /**
     * ? FORGOT PASS
     * * Executes the forgot password functionality.
     */
    forgotPass() {
      const { CONFIRM_FORGOT, API_URL, FORGOT_SUBJECT, FORGOT_TEXT, ALERT_SENDED } = this.val;

      if (confirm(CONFIRM_FORGOT) === true) {
        const URL   = `${API_URL}/auth/pass`;
        const data  = new FormData();

        data.append("email", this.email);
        data.append("subject", FORGOT_SUBJECT);
        data.append("html", FORGOT_TEXT);

        postData(URL, data)
          .then(() => {
            alert(FORGOT_SUBJECT + ALERT_SENDED);
            this.$router.push("/login");
          })
          .catch(setError);
      }
    }
  }
}
</script>
