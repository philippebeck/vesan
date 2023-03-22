<template>
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
      <h2>{{ constants.CONTACT_SUB }}</h2>
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

          <!-- Subject -->
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

          <!-- Text -->
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

        <!-- Send -->
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
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"

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

  props: ["constants"],
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
      this.constants.UI_URL + "/img/logo.svg"
    );
  },

  methods: {
    /**
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      if (this.$serve.checkEmail(this.email) && 
        this.$serve.checkString(this.subject) && 
        this.$serve.checkString(this.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

        this.$serve.postData('/auth/recaptcha', { response: response })
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

      this.$serve.postData("/users/message", message)
        .then(() => {
          alert(this.subject + this.constants.ALERT_SENDED);
          this.$router.push("/");
        })
        .catch(err => {
          if (err.response) {
            alert(err.response.data.message) 
          } else {
            console.log(err);
          }
        });
    }
  }
}
</script>
