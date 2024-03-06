<template>
  <CardElt id="user-set">
    <template #header>
      <h2>
        <i class="fa-solid fa-users-gear fa-lg"></i>
        {{ val.USER_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form enctype="multipart/form-data">
        <TableElt :items="users">
          <template #cell-id="slotProps">
            <BtnElt :content="slotProps.item.id" :href="`mailto:${slotProps.item.email}`" />
          </template>

          <template #cell-name="slotProps">
            <FieldElt
              :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_NAME"
            >
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-email="slotProps">
            <FieldElt
              :id="`email-${slotProps.item.id}`"
              type="email"
              v-model:value="slotProps.item.email"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_EMAIL"
            >
              <template #legend>{{ val.LEGEND_EMAIL }}</template>
              <template #label>{{ val.LABEL_EMAIL }}</template>
            </FieldElt>
          </template>

          <template #cell-image="slotProps">
            <MediaElt
              :src="'/img/thumbnails/users/' + slotProps.item.image"
              :alt="slotProps.item.name"
              :title="slotProps.item.image"
              loading="lazy"
            />

            <FieldElt :id="`image-${slotProps.item.id}`" type="file" :info="val.INFO_UP_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #cell-role="slotProps">
            <FieldElt
              :id="`role-${slotProps.item.id}`"
              type="select"
              :list="val.ROLES_USER"
              v-model:value="slotProps.item.role"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_ROLE"
            >
              <template #legend>{{ val.LEGEND_ROLE }}</template>
              <template #label>{{ val.LABEL_ROLE }}</template>
            </FieldElt>
          </template>

          <template #cell-createdAt="slotProps">
            <p>{{ new Date(slotProps.item.createdAt).toLocaleString() }}</p>

            <BtnElt
              type="button"
              @click="deleteUser(slotProps.item.id)"
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.name"
            >
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updatedAt="slotProps">
            <p>{{ new Date(slotProps.item.updatedAt).toLocaleString() }}</p>

            <BtnElt
              type="button"
              @click="updateUser(slotProps.item.id)"
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.name"
            >
              <template #btn>
                <i class="fa-solid fa-cloud-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script lang="ts">
import BtnElt from './BtnElt.vue'
import CardElt from './CardElt.vue'
import FieldElt from './FieldElt.vue'
import MediaElt from './MediaElt.vue'
import TableElt from './TableElt.vue'

import { checkRange, checkRegex, deleteData, getItemName, putData, setError } from '../assets/services'

export default {
  name: 'UserSet',
  components: { BtnElt, CardElt, FieldElt, MediaElt, TableElt },

  props: ['token', 'users', 'val'],
  data() {
    return {
      name: '',
      email: '',
      image: '',
      pass: ''
    }
  },

  methods: {
    /**
     * ? UPDATE USER
     * * Update a user by their ID.
     *
     * @param {number} id - The ID of the user to update.
     * @returns {Promise<void>}
     */
    async updateUser(id: number): Promise<void> {
      const {
        ALERT_UPDATED,
        API_URL,
        CHECK_EMAIL,
        CHECK_STRING,
        REGEX_EMAIL
      }: {
        ALERT_UPDATED: string
        API_URL: string
        CHECK_EMAIL: RegExp
        CHECK_STRING: string
        REGEX_EMAIL: RegExp
      } = this.val

      const user: User | undefined = this.users.find((u: User) => u.id === id)
      let { name, email, image, role }: { name: string; email: string; image: string; role: string } = user || {
        name: '',
        email: '',
        image: '',
        role: ''
      }

      const IS_NAME_CHECKED: boolean = user ? checkRange(name, CHECK_STRING) : false
      const IS_EMAIL_CHECKED: boolean = user ? checkRegex(email, CHECK_EMAIL, REGEX_EMAIL) : false

      if (IS_NAME_CHECKED && IS_EMAIL_CHECKED) {
        const URL: string = `${API_URL}/users/${id}`
        const img: File | string = document.getElementById(`image-${id}`)?.files[0] ?? image
        const data: FormData = new FormData()

        data.append('name', name)
        data.append('email', email)
        data.append('image', img)
        data.append('role', role)

        try {
          await putData(URL, data, this.token)
          alert(name + ALERT_UPDATED)
        } catch (err) {
          setError(err)
        } finally {
          this.$router.go()
        }
      }
    },

    /**
     * ? DELETE USER
     * * Delete a user by their ID.
     *
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise<void>} A Promise that resolves when the user is successfully deleted.
     */
    async deleteUser(id: number): Promise<void> {
      const { TITLE_DELETE, API_URL, ALERT_DELETED }: { TITLE_DELETE: string; API_URL: string; ALERT_DELETED: string } =
        this.val
      const NAME: string = getItemName(id, this.users)

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL: string = `${API_URL}/users/${id}`

        try {
          await deleteData(URL, this.token)
          alert(NAME + ALERT_DELETED)
        } catch (err: any) {
          setError(err)
        } finally {
          this.$router.push('/home')
        }
      }
    }
  }
}
</script>
