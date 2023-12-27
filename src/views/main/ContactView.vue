<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-envelope-open-text fa-lg"></i>
        {{ val.CONTACT_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipX-loop-altrev-into">{{ val.CONTACT_SUB }}</h2>
        <b>{{ val.INTRO_CONTACT }}</b>
      </template>

      <template #body>
        <form>
          <ListElt :items="val.CONTACT_FORM">

            <template #item-1>
              <FieldElt id="email"
                type="email"
                v-model:value="email"
                :info="val.INFO_EMAIL">
                <template #legend>{{ val.LEGEND_EMAIL }}</template>
                <template #label>{{ val.LABEL_EMAIL }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt id="subject"
                v-model:value="subject"
                :info="val.INFO_SUBJECT">
                <template #legend>{{ val.LEGEND_SUBJECT }}</template>
                <template #label>{{ val.LABEL_SUBJECT }}</template>
              </FieldElt>
            </template>

            <template #item-3>
              <FieldElt id="text"
                type="textarea"
                v-model:value="text"
                :info="val.INFO_TEXT"
                :mix="val.TEXT_MIN"
                :max="val.TEXT_MAX">
                <template #legend>{{ val.LEGEND_TEXT }}</template>
                <template #label>{{ val.LABEL_TEXT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
            <BtnElt type="button"
              class="btn-green"
              :content="val.CONTENT_SEND"
              :title="val.TITLE_MESSAGE">
              <template #btn>
                <i class="fa-regular fa-paper-plane fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>
      </template>
    </CardElt>
  </main>
</template>

<script>
import { checkRange, checkRegex, postData, setError, setMeta } from "servidio"
import { VueRecaptcha } from "vue-recaptcha"

import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"

export default {
  name: "ContactView",
  components: { 
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    VueRecaptcha 
  },
  props: ["val"],
  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  created() {
    const { HEAD_CONTACT, LOGO_SRC, META_CONTACT, UI_URL } = this.val;
    setMeta(HEAD_CONTACT, META_CONTACT, `${UI_URL}/contact`, UI_URL + LOGO_SRC);
  },

  methods: {
    /**
     * ? ON VERIFY
     * * Handles the verification process.
     * @param {any} response - The response from the verification process.
     */
    onVerify(response) {
      const {CHECK_EMAIL, CHECK_STRING, REGEX_EMAIL, TEXT_MIN, TEXT_MAX, API_URL } = this.val;

      if (checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL) &&
          checkRange(this.subject, CHECK_STRING) &&
          checkRange(this.text, CHECK_STRING, TEXT_MIN, TEXT_MAX)) {

        const URL = `${API_URL}/auth/recaptcha`;

        postData(URL, { response })
          .then(({ success }) => success ? this.send() : alert("Failed captcha verification"))
          .catch(err => setError(err))
          .finally(() => this.$router.go());
      }
    },

    /**
     * ? SEND
     * * Sends a message to the API.
     */
    send() {
      const URL   = `${this.val.API_URL}/users/message`;
      const data  = new FormData();

      data.append("email", this.email);
      data.append("subject", this.subject);
      data.append("html", this.text);

      postData(URL, data)
        .then(() => {
          alert(this.subject + this.val.ALERT_SENDED);
          this.$router.push("/");
        })
        .catch(err => setError(err));
    }
  }
}
</script>
