<template>
  <main>
    <header>
      <h1 class="sky-dark"><i class="fa-solid fa-right-to-bracket fa-lg"></i> {{ val.LOGIN_VIEW }}</h1>
    </header>

    <CardElt v-if="type === 'signIn'">
      <template #header>
        <h2 class="sky-dark"><i class="fa-solid fa-door-open fa-lg"></i> {{ val.SIGN_IN }}</h2>
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
            <BtnElt type="button" class="btn-green" :content="val.CONTENT_ENTER" :title="val.TITLE_SIGNIN">
              <template #btn>
                <i class="fa-solid fa-door-open fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt
          type="button"
          @click="type = 'signUp'"
          class="btn-blue"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP"
        >
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="type = 'forgotPass'"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS"
        >
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-else-if="type === 'signUp'">
      <template #header>
        <h2 class="sky-dark"><i class="fa-solid fa-user-plus fa-lg"></i> {{ val.SIGN_UP }}</h2>
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
            <BtnElt type="button" class="btn-blue" :content="val.CONTENT_SIGNUP" :title="val.TITLE_SIGNUP">
              <template #btn>
                <i class="fa-solid fa-user-plus fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt
          type="button"
          @click="type = 'signIn'"
          class="btn-green"
          :content="val.CONTENT_ENTER"
          :title="val.TITLE_GO + val.SIGN_IN"
        >
          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="type = 'forgotPass'"
          class="btn-orange"
          :content="val.CONTENT_SEND"
          :title="val.TITLE_GO + val.FORGOT_PASS"
        >
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>

    <CardElt v-else-if="type === 'forgotPass'">
      <template #header>
        <h2 class="sky-dark"><i class="fa-solid fa-key fa-lg"></i> {{ val.FORGOT_PASS }}</h2>
        <p>{{ val.INTRO_FORGOT }}</p>
      </template>

      <template #body>
        <form>
          <FieldElt type="email" v-model:value="email" :info="val.INFO_EMAIL">
            <template #legend>{{ val.LEGEND_EMAIL }}</template>
            <template #label>{{ val.LABEL_EMAIL }}</template>
          </FieldElt>

          <vue-recaptcha :sitekey="val.RECAPTCHA_KEY" @verify="onVerify">
            <BtnElt type="button" class="btn-orange" :content="val.CONTENT_SEND" :title="val.TITLE_FORGOT">
              <template #btn>
                <i class="fa-regular fa-paper-plane fa-lg"></i>
              </template>
            </BtnElt>
          </vue-recaptcha>
        </form>

        <BtnElt
          type="button"
          @click="type = 'signUp'"
          class="btn-blue"
          :content="val.CONTENT_SIGNUP"
          :title="val.TITLE_GO + val.SIGN_UP"
        >
          <template #btn>
            <i class="fa-solid fa-user-plus fa-lg"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="type = 'signIn'"
          class="btn-green"
          :content="val.CONTENT_ENTER"
          :title="val.TITLE_GO + val.SIGN_IN"
        >
          <template #btn>
            <i class="fa-solid fa-door-open fa-lg"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import FieldElt from '../components/FieldElt.vue'

import { checkRange, checkRegex, postData, setError, setMeta } from '../assets/services'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'LoginView',
  components: { BtnElt, CardElt, FieldElt, VueRecaptcha },

  props: ['val'],
  data() {
    return {
      name: '',
      email: '',
      image: '',
      pass: '',
      type: 'signIn'
    }
  },

  /**
   * ? CREATED
   * * A function that sets the meta data of the page
   * * Redirects to the home page if the user is logged in
   */
  created(): void {
    const {
      HEAD_LOGIN,
      LOGO_SRC,
      META_LOGIN,
      UI_URL
    }: { HEAD_LOGIN: string; LOGO_SRC: string; META_LOGIN: string; UI_URL: string } = this.val
    setMeta(HEAD_LOGIN, META_LOGIN, `${UI_URL}/login`, `${UI_URL}${LOGO_SRC}`)

    if (localStorage.userId) this.$router.push('/')
  },

  methods: {
    /**
     * ? ON VERIFY
     * * Asynchronously handles the verification of a response.
     * @param {string} response - the response to be verified
     * @return {Promise<void>} a promise that resolves with no value
     */
    async onVerify(response: string): Promise<void> {
      const { ALERT_RECAPTCHA, API_URL } = this.val
      const URL: string = `${API_URL}/auth/recaptcha`

      try {
        const { success }: { success: boolean } = await postData(URL, { response })

        if (success) {
          switch (this.type) {
            case 'signIn':
              this.signIn()
              break
            case 'signUp':
              this.signUp()
              break
            case 'forgotPass':
              this.forgotPass()
              break
          }
        } else {
          alert(ALERT_RECAPTCHA)
        }
      } catch (err) {
        setError(err)
      }
    },

    /**
     * ? SIGN IN
     * * Signs in the user.
     *
     * @returns {Promise<void>} - A promise that resolves when the user is signed in.
     */
    async signIn() {
      const { API_URL, CHECK_EMAIL, CHECK_PASS, REGEX_EMAIL, REGEX_PASS } = this.val

      const IS_EMAIL_CHECKED = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)
      const IS_PASS_CHECKED = checkRegex(this.pass, CHECK_PASS, REGEX_PASS)

      if (IS_EMAIL_CHECKED && IS_PASS_CHECKED) {
        const URL = `${API_URL}/auth`
        const data = new FormData()

        data.append('email', this.email)
        data.append('pass', this.pass)

        try {
          const res = await postData(URL, data)

          localStorage.setItem('userToken', JSON.stringify(res.token))
          localStorage.setItem('userId', JSON.stringify(res.userId))
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    },

    /**
     * ? SIGN UP
     * * Creates a new user.
     *
     * @returns {Promise<void>} A Promise that resolves when the new user is successfully created.
     */
    async signUp(): Promise<void> {
      const {
        ALERT_CREATED,
        ALERT_IMG,
        API_URL,
        CHECK_EMAIL,
        CHECK_PASS,
        CHECK_STRING,
        REGEX_EMAIL,
        REGEX_PASS
      }: {
        ALERT_CREATED: string
        ALERT_IMG: string
        API_URL: string
        CHECK_EMAIL: string
        CHECK_PASS: string
        CHECK_STRING: string
        REGEX_EMAIL: RegExp
        REGEX_PASS: RegExp
      } = this.val

      const IS_NAME_CHECKED: boolean = checkRange(this.name, CHECK_STRING)
      const IS_EMAIL_CHECKED: boolean = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)
      const IS_PASS_CHECKED: boolean = checkRegex(this.pass, CHECK_PASS, REGEX_PASS)

      if (IS_NAME_CHECKED && IS_EMAIL_CHECKED && IS_PASS_CHECKED) {
        const URL: string = `${API_URL}/users`
        const data: FormData = new FormData()
        const img: File | undefined = (document.querySelector('[type="file"]') as HTMLInputElement)?.files?.[0]

        if (img) {
          data.append('name', this.name)
          data.append('email', this.email)
          data.append('image', img)
          data.append('pass', this.pass)
          data.append('role', 'user')

          try {
            await postData(URL, data)
            alert(this.name + ALERT_CREATED)
          } catch (err) {
            setError(err)
          } finally {
            this.$router.go(0)
          }
        } else {
          alert(ALERT_IMG)
        }
      }
    },

    /**
     * ? FORGOT PASS
     * * Executes the forgot password functionality.
     */
    async forgotPass(): Promise<void> {
      const { ALERT_SENDED, API_URL, CHECK_EMAIL, CONFIRM_FORGOT, FORGOT_SUBJECT, FORGOT_TEXT, REGEX_EMAIL } = this.val
      const IS_EMAIL_CHECKED: boolean = checkRegex(this.email, CHECK_EMAIL, REGEX_EMAIL)

      if (IS_EMAIL_CHECKED && confirm(CONFIRM_FORGOT)) {
        const URL: string = `${API_URL}/auth/pass`
        const data: FormData = new FormData()

        data.append('email', this.email)
        data.append('subject', FORGOT_SUBJECT)
        data.append('html', FORGOT_TEXT)

        try {
          await postData(URL, data)
          alert(FORGOT_SUBJECT + ALERT_SENDED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    }
  }
}
</script>
