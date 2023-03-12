<template>
  <header>
    <h1 class="sky ani-slideL-it">
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
              class="ani-slideR-it"
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
              class="ani-slideL-it"
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
              class="ani-slideR-it"
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
        <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
          <BtnElt type="button"
            @click="send()" 
            class="btn-green ani-slideL-it"
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
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ContactView",
  components: { VueRecaptcha },
  props: ["constants"],

  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  methods: {
    /**
     * SEND A CONTACT MESSAGE
     */
    send() {
      if (this.$serve.checkEmail(this.email) && 
        this.$serve.checkString(this.subject) && 
        this.$serve.checkString(this.text, this.constants.TEXT_MIN, this.constants.TEXT_MAX)) {

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
}
</script>
