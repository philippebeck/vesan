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
              <FieldElt id="email" type="email" v-model:value="email" :info="val.INFO_EMAIL">
                <template #legend>{{ val.LEGEND_EMAIL }}</template>
                <template #label>{{ val.LABEL_EMAIL }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt id="subject" v-model:value="subject" :info="val.INFO_SUBJECT">
                <template #legend>{{ val.LEGEND_SUBJECT }}</template>
                <template #label>{{ val.LABEL_SUBJECT }}</template>
              </FieldElt>
            </template>

            <template #item-3>
              <FieldElt
                id="text"
                type="textarea"
                v-model:value="text"
                :info="val.INFO_TEXT"
                :mix="val.TEXT_MIN"
                :max="val.TEXT_MAX"
              >
                <template #legend>{{ val.LEGEND_TEXT }}</template>
                <template #label>{{ val.LABEL_TEXT }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
            <BtnElt type="button" class="btn-green" :content="val.CONTENT_SEND" :title="val.TITLE_MESSAGE">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { VueRecaptcha } from 'vue-recaptcha'
import { checkRange, checkRegex, postData, setError, setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import FieldElt from '../components/FieldElt.vue'
import ListElt from '../components/ListElt.vue'

interface Message {
  email: string
  subject: string
  text: string
}

interface Val {
  ALERT_RECAPTCHA: string
  ALERT_SENDED: string
  API_URL: string
  CHECK_EMAIL: string
  CHECK_STRING: string
  HEAD_CONTACT: string
  LOGO_SRC: string
  META_CONTACT: string
  REGEX_EMAIL: RegExp
  TEXT_MIN: number
  TEXT_MAX: number
  UI_URL: string
}

export default defineComponent({
  name: 'ContactView',
  components: { BtnElt, CardElt, FieldElt, ListElt, VueRecaptcha },
  props: ['val'],

  data() {
    return {
      email: '',
      subject: '',
      text: ''
    } as Message
  },

  /**
   * ? CREATED
   * * A function that sets the meta data of the page
   */
  created() {
    const { HEAD_CONTACT, LOGO_SRC, META_CONTACT, UI_URL }: Val = this.val
    setMeta(HEAD_CONTACT, META_CONTACT, `${UI_URL}/contact`, UI_URL + LOGO_SRC)
  },

  methods: {
    /**
     * ? ON VERIFY
     * * Handles the verification process.
     *
     * @param {string} response - The response from the verification process.
     * @returns {Promise<void>}
     */
    async onVerify(response: string): Promise<void> {
      const { ALERT_RECAPTCHA, API_URL, CHECK_EMAIL, CHECK_STRING, REGEX_EMAIL, TEXT_MIN, TEXT_MAX }: Val = this.val

      const IS_EMAIL_CHECKED: boolean = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)
      const IS_SUBJECT_CHECKED: boolean = checkRange(this.subject, CHECK_STRING)
      const IS_TEXT_CHECKED: boolean = checkRange(this.text, CHECK_STRING, TEXT_MIN, TEXT_MAX)

      if (IS_EMAIL_CHECKED && IS_SUBJECT_CHECKED && IS_TEXT_CHECKED) {
        const URL: string = `${API_URL}/auth/recaptcha`

        try {
          const { success }: { success: boolean } = await postData(URL, { response })

          if (success) {
            this.send()
          } else {
            alert(ALERT_RECAPTCHA)
          }
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    },

    /**
     * ? SEND
     * * Asynchronously sends a message to the specified URL using the email, subject & text provided.
     *
     * @return {Promise<void>} A Promise that resolves when the message is successfully sent & rejects if an error occurs.
     */
    async send(): Promise<void> {
      const { ALERT_SENDED, API_URL }: Val = this.val

      const URL: string = `${API_URL}/users/message`
      const data: FormData = new FormData()

      data.append('email', this.email)
      data.append('subject', this.subject)
      data.append('html', this.text)

      try {
        await postData(URL, data)
        alert(this.subject + ALERT_SENDED)
      } catch (err) {
        setError(err)
      } finally {
        this.$router.push('/')
      }
    }
  }
})
</script>
