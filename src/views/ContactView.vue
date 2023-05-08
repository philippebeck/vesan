<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-envelope-open-text fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CONTACT_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipX-loop-altrev-into">
          {{ constants.CONTACT_SUB }}
        </h2>
        <b>{{ constants.INTRO_CONTACT }}</b>
      </template>

      <template #body>
        <form>
          <ListElt :items="constants.CONTACT_FORM">

            <template #item-1>
              <FieldElt type="email"
                v-model:value="email"
                :info="constants.INFO_EMAIL">

                <template #legend>
                  {{ constants.LEGEND_EMAIL }}
                </template>
                <template #label>
                  {{ constants.LABEL_EMAIL }}
                </template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt v-model:value="subject"
                :info="constants.INFO_SUBJECT">

                <template #legend>
                  {{ constants.LEGEND_SUBJECT }}
                </template>
                <template #label>
                  {{ constants.LABEL_SUBJECT }}
                </template>
              </FieldElt>
            </template>

            <template #item-3>
              <FieldElt type="textarea"
                v-model:value="text"
                :info="constants.INFO_TEXT"
                :mix="constants.TEXT_MIN"
                :max="constants.TEXT_MAX">

                <template #legend>
                  {{ constants.LEGEND_TEXT }}
                </template>
                <template #label>
                  {{ constants.LABEL_TEXT }}
                </template>
              </FieldElt>
            </template>
          </ListElt>

          <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY"
            @verify="onVerify">
            <BtnElt type="button"
              class="btn-green"
              :content="constants.CONTENT_SEND"
              :title="constants.TITLE_MESSAGE">

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
import BtnElt from "../assets/BtnElt"
import CardElt from "../assets/CardElt"
import FieldElt from "../assets/FieldElt"
import ListElt from "../assets/ListElt"

import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ContactView",
  components: { 
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    VueRecaptcha 
  },

  props: ["constants", "user"],
  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  created() {
    this.$serve.setMeta(
      this.constants.HEAD_CONTACT, 
      this.constants.META_CONTACT,
      this.constants.UI_URL + "/contact",
      this.constants.UI_URL + this.constants.LOGO_SRC
    );
  },

  methods: {
    /**
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      let emailMsg  = this.constants.CHECK_EMAIL;
      let regex     = this.constants.REGEX_EMAIL;
      let stringMsg = this.constants.CHECK_STRING;
      let min       = this.constants.TEXT_MIN;
      let max       = this.constants.TEXT_MAX;

      if (this.$serve.checkRegex(this.email, emailMsg, regex) && 
        this.$serve.checkRange(this.subject, stringMsg) && 
        this.$serve.checkRange(this.text, stringMsg, min, max)) {

        let url = this.constants.API_URL + "/auth/recaptcha";
        let options = {
          method: "POST",
          mode: "cors",
          headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
          body: { response: response }
        };

        this.$serve.fetchSet(url, options)
          .then(result => {
            if (result.success) {
              this.send();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => {
            if (err.response) {
              alert(err.response.data.message) 
            } else {
              console.log(err);
            }
            this.$router.go();
          });
      }
    },

    /**
     * SEND A CONTACT MESSAGE
     */
    send() {
      let message = new FormData();

      message.append("email", this.email);
      message.append("subject", this.subject);
      message.append("html", this.text);

      let url = this.constants.API_URL + "/users/message";
      let options = {
        method: "POST",
        mode: "cors",
        headers: { "Authorization": `Bearer ${this.constants.TOKEN}` },
        body: message
      };

      this.$serve.fetchSet(url, options)
        .then(() => {
          alert(this.subject + this.constants.ALERT_SENDED);
          this.$router.push("/");
        })
        .catch(err => { this.$serve.checkError(err) });
    }
  }
}
</script>
