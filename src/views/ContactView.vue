<template>

  <!-- CONTACT PAGE -->
  <CardElt>
    <template #header>
      <h1 class="sky anima-slideL">
        <i class="fa-solid fa-at fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.CONTACT_VIEW }}
      </h1>
      <p>{{ constants.INTRO_CONTACT }}</p>
    </template>

    <template #body>
      <form>
        <ListElt :items="constants.CONTACT_LIST">

          <!-- User Email -->
          <template #item-1>
            <FieldElt id="email"
              type="email"
              v-model:value="email"
              class="anima-slideR"
              :info="constants.INFO_EMAIL">

              <template #legend>
                {{ constants.LEGEND_EMAIL }}
              </template>
              <template #label>
                {{ constants.LABEL_EMAIL }}
              </template>
            </FieldElt>
          </template>

          <!-- Message Subject -->
          <template #item-2>
            <FieldElt id="subject"
              v-model:value="subject"
              class="anima-slideL"
              :info="constants.INFO_SUBJECT"
              :min="2">

              <template #legend>
                {{ constants.LEGEND_SUBJECT }}
              </template>
              <template #label>
                {{ constants.LABEL_SUBJECT }}
              </template>
            </FieldElt>
          </template>

          <!-- Message Content -->
          <template #item-3>
            <FieldElt id="text"
              type="textarea"
              v-model:value="text"
              class="anima-slideR"
              :info="constants.INFO_TEXT"
              :max="100">

              <template #legend>
                {{ constants.LEGEND_TEXT }}
              </template>
              <template #label>
                {{ constants.LABEL_TEXT }}
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Send Button -->
        <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
          <BtnElt type="button"
            @click="send()" 
            class="btn-green anima-slideL"
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
        this.$serve.checkName(this.subject) && 
        this.$serve.checkText(this.text)) {

        let message = new FormData();

        message.append("email", this.email);
        message.append("subject", this.subject);
        message.append("html", this.text);

        this.$serve.postData("/api/users/message", message)
          .then(() => {
            alert(message.get("subject") + " sended !");
            this.$router.push("/");
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
