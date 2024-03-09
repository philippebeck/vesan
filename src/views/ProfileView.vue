<template>
  <main id="top">
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-user-gear fa-lg"></i>
        {{ val.PROFILE_VIEW }}
      </h1>
    </header>

    <NavElt v-if="checkSession('admin')" class="sidebar">
      <template #hide>
        <i class="fa-solid fa-eye fa-fw" :title="val.TITLE_TOGGLE"></i>
      </template>

      <template #last>
        <a href="#user-set" :title="val.USER_MANAGER">
          <i class="fa-solid fa-users-gear fa-fw"></i>
        </a>
      </template>

      <template #top>
        <i class="fa-solid fa-chevron-circle-up fa-fw" :title="val.TITLE_TOP"></i>
      </template>
    </NavElt>

    <CardElt>
      <template #header>
        <h2>{{ val.PROFILE_SUB }}</h2>
        <b>{{ val.INTRO_PROFILE }}</b>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.USER_FORM">
            <template #item-1>
              <FieldElt id="name" v-model:value="user.name" @keyup.enter="updateUser()" :info="val.INFO_NAME" :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt
                id="email"
                type="email"
                v-model:value="user.email"
                @keyup.enter="updateUser()"
                :info="val.INFO_EMAIL"
              >
                <template #legend>{{ val.LEGEND_EMAIL }}</template>
                <template #label>{{ val.LABEL_EMAIL }}</template>
              </FieldElt>
            </template>

            <template #item-3>
              <MediaElt v-if="user.image" :src="'/img/thumbnails/users/' + user.image" :alt="user.name" />

              <FieldElt id="image" type="file" v-model:value="image" :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt
                id="pass"
                type="password"
                v-model:value="pass"
                @keyup.enter="updateUser()"
                :info="val.INFO_PASSWORD"
              >
                <template #legend>{{ val.LEGEND_PASSWORD }}</template>
                <template #label>{{ val.LABEL_PASSWORD }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt
            type="button"
            @click="updateUser()"
            class="btn-sky"
            :content="val.TITLE_UPDATE"
            :title="val.INFO_UP_PROFILE"
          >
            <template #btn>
              <i class="fa-solid fa-user-pen fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt
            type="button"
            @click="logout()"
            class="btn-orange"
            :content="val.CONTENT_LOGOUT"
            :title="val.TITLE_LOGOUT"
          >
            <template #btn>
              <i class="fa-solid fa-right-from-bracket fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt
            type="button"
            @click="deleteUser()"
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE_ACCOUNT"
          >
            <template #btn>
              <i class="fa-solid fa-user-slash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>

      <template #aside v-if="checkSession('admin')">
        <UserSet :val="val" :token="token" :users="users" />
      </template>
    </CardElt>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { checkRange, checkRegex, checkRole, deleteData, putData, setError, setMeta } from '../assets/services'

import BtnElt from '../components/BtnElt.vue'
import CardElt from '../components/CardElt.vue'
import FieldElt from '../components/FieldElt.vue'
import ListElt from '../components/ListElt.vue'
import MediaElt from '../components/MediaElt.vue'
import NavElt from '../components/NavElt.vue'
import UserSet from '../components/UserSet.vue'

interface User {
  id: number
  name: string
  email: string
  image: string
  pass: string
  role: string
}

interface Val {
  ALERT_DELETED: string
  ALERT_LOGOUT: string
  ALERT_UPDATED: string
  API_URL: string
  CHECK_EMAIL: string
  CHECK_PASS: string
  CHECK_STRING: string
  HEAD_PROFILE: string
  LOGO_SRC: string
  META_PROFILE: string
  REGEX_EMAIL: RegExp
  REGEX_PASS: RegExp
  TITLE_DELETE: string
  UI_URL: string
}

export default defineComponent({
  name: 'ProfileView',
  components: { BtnElt, CardElt, FieldElt, ListElt, MediaElt, NavElt, UserSet },
  props: ['val'],

  /**
   * ? CREATED
   * * Get the user data from the store & set the meta tags
   * * If the user is not logged in, redirect to the login page
   * @returns {Promise<void>}
   */
  async created(): Promise<void> {
    const { ALERT_LOGOUT, HEAD_PROFILE, LOGO_SRC, META_PROFILE, UI_URL }: Val = this.val
    setMeta(HEAD_PROFILE, META_PROFILE, UI_URL, UI_URL + LOGO_SRC)

    if (this.token) {
      await this.$store.dispatch('readUser', this.id)
      await this.$store.dispatch('listUsers')
    } else {
      alert(ALERT_LOGOUT)
      this.$router.push('/')
    }
  },

  computed: {
    ...mapState(['id', 'token', 'user', 'users'])
  },

  methods: {
    ...mapActions(['readUser', 'listUsers']),

    /**
     * ? CHECK SESSION
     * * Checks the session based on the specified role.
     *
     * @param {string} role - the role to check the session against
     * @return {boolean} the result of the session check
     */
    checkSession(role: string): boolean {
      return checkRole(this.user.role, role)
    },

    /**
     * ? LOGOUT
     * * Logout the user by removing the userId & userToken from localStorage
     */
    logout() {
      localStorage.removeItem('userId')
      localStorage.removeItem('userToken')

      this.$router.go(0)
    },

    /**
     * ? UPDATE USER
     * * Updates the user information on the server.
     *
     * @returns {Promise<void>}
     */
    async updateUser(): Promise<void> {
      const { ALERT_UPDATED, API_URL, CHECK_EMAIL, CHECK_PASS, CHECK_STRING, REGEX_EMAIL, REGEX_PASS }: Val = this.val
      const { id, name, email, image, role }: User = this.user

      const IS_NAME_CHECKED: boolean = checkRange(name, CHECK_STRING)
      const IS_EMAIL_CHECKED: boolean = checkRegex(email, CHECK_EMAIL, REGEX_EMAIL)
      const IS_PASS_CHECKED: boolean = this.pass && checkRegex(this.pass, CHECK_PASS, REGEX_PASS)

      if (IS_NAME_CHECKED && IS_EMAIL_CHECKED) {
        const URL: string = `${API_URL}/users/${id}`

        const data: FormData = new FormData()
        const img: File | string = (document.getElementById('image') as HTMLInputElement)?.files?.[0] ?? image

        if (IS_PASS_CHECKED) data.append('pass', this.pass)

        data.append('name', name)
        data.append('email', email)
        data.append('image', img)
        data.append('role', role)

        try {
          await putData(URL, data, this.token)
          alert(this.user.name + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go(0)
        }
      }
    },

    /**
     * ? DELETE USER
     * * Deletes a user from the system.
     * @returns {Promise<void>}
     */
    async deleteUser(): Promise<void> {
      const { ALERT_DELETED, API_URL, TITLE_DELETE }: Val = this.val
      const { id, name }: User = this.user

      if (confirm(`${TITLE_DELETE} ${name} ?`)) {
        const URL: string = `${API_URL}/users/${id}`

        try {
          await deleteData(URL, this.token)

          localStorage.removeItem('userId')
          localStorage.removeItem('userToken')

          alert(name + ALERT_DELETED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.push('/home')
        }
      }
    }
  }
})
</script>
