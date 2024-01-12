<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-right-to-bracket fa-lg"></i> {{ val.LOGIN_VIEW }}
      </h1>
    </header>

    <CardElt v-if="type === 'signIn'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-door-open fa-lg"></i> {{ val.SIGN_IN }}
        </h2>
        <p>{{ val.INTRO_SIGNIN }}</p>
      </template>

      <template #body>
        <form>
          <FieldElt type="email" v-model:value="email" :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <FieldElt type="password" v-model:value="pass" :info="val.INFO_PASSWORD">
            <template #legend>{{ val.LEGEND_PASSWORD }}</template>
            <template #label>{{ val.LABEL_PASSWORD }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
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
          @click="type = 'signUp'"
          class="btn-blue"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="type = 'forgotPass'"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS">
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-else-if="type === 'signUp'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-user-plus fa-lg"></i> {{ val.SIGN_UP }}
        </h2>
        <p>{{ val.INTRO_SIGNUP }}</p>
      </template>

      <template #body>
        <form enctype="multipart/form-data">

          <FieldElt v-model:value="name" :info="val.INFO_NAME" :min="2">
            <template #legend>{{ val.LEGEND_NAME }}</template>
            <template #label>{{ val.LABEL_NAME }}</template>
          </FieldElt>

          <FieldElt type="email" v-model:value="email" :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <FieldElt type="file" v-model:value="image" :info="val.INFO_IMAGE">
            <template #legend>{{ val.LEGEND_IMAGE }}</template>
            <template #label>{{ val.LABEL_IMAGE }}</template>
          </FieldElt>

          <FieldElt type="password" v-model:value="pass" :info="val.INFO_PASSWORD">
            <template #legend>{{ val.LEGEND_PASSWORD }}</template>
            <template #label>{{ val.LABEL_PASSWORD }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
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
            @click="type = 'signIn'"
            class="btn-green"
            :content="val.CONTENT_ENTER"
            :title="val.TITLE_GO + val.SIGN_IN">
            <template #btn>
              <i class="fa-solid fa-door-open fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="type = 'forgotPass'"
            class="btn-orange"
            :content="val.CONTENT_SEND"
            :title="val.TITLE_GO + val.FORGOT_PASS">
            <template #btn>
              <i class="fa-regular fa-paper-plane fa-lg"></i>
            </template>
          </BtnElt>
      </template>
    </CardElt>

    <CardElt v-else-if="type === 'forgotPass'">
      <template #header>
        <h2 class="sky-dark">
          <i class="fa-solid fa-key fa-lg"></i> {{ val.FORGOT_PASS }}
        </h2>
        <p>{{ val.INTRO_FORGOT }}</p>
      </template>

      <template #body>
        <form>
          <FieldElt type="email" v-model:value="email" :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
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
          @click="type = 'signUp'"
          class="btn-blue"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP">
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="type = 'signIn'"
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
import { VueRecaptcha } from "vue-recaptcha"

export default {
  name: "LoginView",
  components: { BtnElt, CardElt, FieldElt, VueRecaptcha },
  props: ["val"],
  data() {
    return {
      name: "",
      email: "",
      image: "",
      pass: "",
      type: "signIn"
    }
  },

  created() {
    const { HEAD_LOGIN, LOGO_SRC, META_LOGIN, UI_URL } = this.val;
    setMeta(HEAD_LOGIN, META_LOGIN, `${UI_URL}/login`, UI_URL + LOGO_SRC);

    if (localStorage.userId) this.$router.push("/");
  },

  methods: {
    /**
     * ? ON VERIFY
     * * Handles the verification of the response from the reCAPTCHA.
     * @param {Object} response - The response from the reCAPTCHA.
     */
    onVerify(response) {
      const { ALERT_RECAPTCHA, API_URL } = this.val;
      const URL = `${API_URL}/auth/recaptcha`;

      postData(URL, { response })
        .then(({ success }) => {
          if      (success && this.type === "signIn")     this.signIn();
          else if (success && this.type === "signUp")     this.signUp();
          else if (success && this.type === "forgotPass") this.forgotPass();
          else    alert(ALERT_RECAPTCHA);
        })
        .catch(err => setError(err));
    },

    /**
     * ? SIGN IN
     * * Signs in the user.
     */
    signIn() {
      const { API_URL, CHECK_EMAIL, CHECK_PASS, REGEX_EMAIL, REGEX_PASS } = this.val;
      const IS_EMAIL_CHECKED  = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL);
      const IS_PASS_CHECKED   = checkRegex(this.pass, CHECK_PASS, REGEX_PASS);

      if (IS_EMAIL_CHECKED && IS_PASS_CHECKED) {
        const URL   = `${API_URL}/auth`;
        const data  = new FormData();

        data.append("email", this.email);
        data.append("pass", this.pass);

        postData(URL, data)
          .then((res) => {
            localStorage.setItem("userToken", JSON.stringify(res.token));
            localStorage.setItem("userId", JSON.stringify(res.userId));
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    },

    /**
     * ? SIGN UP
     * * Creates a new user.
     */
    signUp() {
      const { ALERT_CREATED, ALERT_IMG, API_URL, CHECK_EMAIL, CHECK_PASS, CHECK_STRING, REGEX_EMAIL, REGEX_PASS } = this.val;

      const IS_NAME_CHECKED   = checkRange(this.name, CHECK_STRING);
      const IS_EMAIL_CHECKED  = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL);
      const IS_PASS_CHECKED   = checkRegex(this.pass, CHECK_PASS, REGEX_PASS);

      if (IS_NAME_CHECKED && IS_EMAIL_CHECKED && IS_PASS_CHECKED) {
        const URL   = `${API_URL}/users`;
        const data  = new FormData();
        const img   = document.querySelector('[type="file"]')?.files[0];

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
            .catch(err => setError(err));

        } else { alert(ALERT_IMG) }
      }
    },

    /**
     * ? FORGOT PASS
     * * Executes the forgot password functionality.
     */
    forgotPass() {
      const { ALERT_SENDED, API_URL, CHECK_EMAIL, CONFIRM_FORGOT, FORGOT_SUBJECT, FORGOT_TEXT, REGEX_EMAIL } = this.val;
      const IS_EMAIL_CHECKED = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL);

      if (IS_EMAIL_CHECKED && confirm(CONFIRM_FORGOT)) {
        const URL   = `${API_URL}/auth/pass`;
        const data  = new FormData();

        data.append("email", this.email);
        data.append("subject", FORGOT_SUBJECT);
        data.append("html", FORGOT_TEXT);

        postData(URL, data)
          .then(() => {
            alert(FORGOT_SUBJECT + ALERT_SENDED);
            this.$router.go();
          })
          .catch(err => setError(err));
      }
    }
  }
}
</script>
