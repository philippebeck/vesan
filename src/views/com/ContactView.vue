<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-envelope-open-text fa-lg"
          aria-hidden="true">
        </i>
        {{ val.CONTACT_VIEW }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2 class="ani-flipX-loop-altrev-into">
          {{ val.CONTACT_SUB }}
        </h2>
        <b>{{ val.INTRO_CONTACT }}</b>
      </template>

      <template #body>
        <form>
          <ListElt :items="val.CONTACT_FORM">

            <template #item-1>
              <FieldElt type="email"
                v-model:value="email"
                :info="val.INFO_EMAIL">

                <template #legend>
                  {{ val.LEGEND_EMAIL }}
                </template>
                <template #label>
                  {{ val.LABEL_EMAIL }}
                </template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt v-model:value="subject"
                :info="val.INFO_SUBJECT">

                <template #legend>
                  {{ val.LEGEND_SUBJECT }}
                </template>
                <template #label>
                  {{ val.LABEL_SUBJECT }}
                </template>
              </FieldElt>
            </template>

            <template #item-3>
              <FieldElt type="textarea"
                v-model:value="text"
                :info="val.INFO_TEXT"
                :mix="val.TEXT_MIN"
                :max="val.TEXT_MAX">

                <template #legend>
                  {{ val.LEGEND_TEXT }}
                </template>
                <template #label>
                  {{ val.LABEL_TEXT }}
                </template>
              </FieldElt>
            </template>
          </ListElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY"
            @verify="onVerify">
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
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"

import { checkRange, checkRegex, postData, setError, setMeta } from "servidio"
import { VueRecaptcha } from "vue-recaptcha"

export default {
  name: "ContactView",
  components: { 
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    VueRecaptcha 
  },
  props: ["val", "user"],

  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  created() {
    setMeta(
      this.val.HEAD_CONTACT, 
      this.val.META_CONTACT,
      this.val.UI_URL + "/contact",
      this.val.UI_URL + this.val.LOGO_SRC
    );
  },

  methods: {
    /**
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      const MSG = this.val.CHECK_STRING;

      if (checkRegex(this.email, this.val.CHECK_EMAIL, this.val.REGEX_EMAIL) &&
          checkRange(this.subject, MSG) &&
          checkRange(this.text, MSG, this.val.TEXT_MIN, this.val.TEXT_MAX)) {

        postData(this.val.API_URL + "/auth/recaptcha", { response: response })
          .then(result => {
            if (result.success) {
              this.send();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => {
            setError(err);
            this.$router.go();
          });
      }
    },

    /**
     * SEND A CONTACT MESSAGE
     */
    send() {
      const URL   = this.val.API_URL + "/users/message";
      const data  = new FormData();

      data.append("email", this.email);
      data.append("subject", this.subject);
      data.append("html", this.text);

      postData(URL, data)
        .then(() => {
          alert(this.subject + this.val.ALERT_SENDED);
          this.$router.push("/");
        })
        .catch(err => { setError(err) });
    }
  }
}
</script>
