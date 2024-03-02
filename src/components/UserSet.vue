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
            <BtnElt :content="slotProps.item.id"
              :href="`mailto:${slotProps.item.email}`"/>
          </template>

          <template #cell-name="slotProps">
            <FieldElt :id="`name-${slotProps.item.id}`"
              v-model:value="slotProps.item.name"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_NAME">
              <template #legend>{{ val.LEGEND_NAME }}</template>
              <template #label>{{ val.LABEL_NAME }}</template>
            </FieldElt>
          </template>

          <template #cell-email="slotProps">
            <FieldElt :id="`email-${slotProps.item.id}`"
              type="email"
              v-model:value="slotProps.item.email"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_EMAIL">
              <template #legend>{{ val.LEGEND_EMAIL }}</template>
              <template #label>{{ val.LABEL_EMAIL }}</template>
            </FieldElt>
          </template>

          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/users/' + slotProps.item.image"
              :alt="slotProps.item.name"
              :title="slotProps.item.image"
              loading="lazy"/>

            <FieldElt :id="`image-${slotProps.item.id}`"
              type="file"
              :info="val.INFO_UP_IMAGE">
              <template #legend>{{ val.LEGEND_IMAGE }}</template>
              <template #label>{{ val.LABEL_IMAGE }}</template>
            </FieldElt>
          </template>

          <template #cell-role="slotProps">
            <FieldElt :id="`role-${slotProps.item.id}`"
              type="select"
              :list="val.ROLES_USER"
              v-model:value="slotProps.item.role"
              @keyup.enter="updateUser(slotProps.item.id)"
              :info="val.INFO_UP_ROLE">
              <template #legend>{{ val.LEGEND_ROLE }}</template>
              <template #label>{{ val.LABEL_ROLE }}</template>
            </FieldElt>
          </template>

          <template #cell-createdAt="slotProps">
            <p>{{ new Date(slotProps.item.createdAt).toLocaleString() }}</p>

            <BtnElt type="button"
              @click="deleteUser(slotProps.item.id)" 
              class="btn-red"
              :title="val.TITLE_DELETE + slotProps.item.name">
              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <template #cell-updatedAt="slotProps">
            <p>{{ new Date(slotProps.item.updatedAt).toLocaleString() }}</p>

            <BtnElt type="button"
              @click="updateUser(slotProps.item.id)" 
              class="btn-sky"
              :title="val.TITLE_UPDATE + slotProps.item.name">
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

<script>
import BtnElt from "./BtnElt"
import CardElt from "./CardElt"
import FieldElt from "./FieldElt"
import MediaElt from "./MediaElt"
import TableElt from "./TableElt"

import { checkRange, checkRegex, deleteData, getItemName, putData, setError } from "../app/services"

export default {
  name: "UserSet",
  components: { BtnElt, CardElt, FieldElt, MediaElt, TableElt },

  props: ["token", "users", "val"],
  data() {
    return {
      name: "",
      email: "",
      image:"",
      pass: ""
    }
  },

  methods: {
    /**
     * ? UPDATE USER
     * * Update a user by their ID.
     * @param {number} id - The ID of the user to update.
     */
    async updateUser(id) {
      const { ALERT_UPDATED, API_URL, CHECK_EMAIL, CHECK_STRING, REGEX_EMAIL } = this.val;

      const user = this.users.find(u => u.id === id);
      let { name, email, image, role } = user;

      const IS_NAME_CHECKED  = user && checkRange(name, CHECK_STRING);
      const IS_EMAIL_CHECKED = user && checkRegex(email, CHECK_EMAIL, REGEX_EMAIL);

      if (IS_NAME_CHECKED && IS_EMAIL_CHECKED) {
        const URL  = `${API_URL}/users/${id}`;
        const img  = document.getElementById(`image-${id}`)?.files[0] ?? image;
        const data = new FormData();

        data.append("name", name);
        data.append("email", email);
        data.append("image", img);
        data.append("role", role);

        try {
          await putData(URL, data, this.token);
          alert(name + ALERT_UPDATED);

        } catch (err) {
          setError(err);
        } finally {
          this.$router.go();
        }
      }
    },

    /**
     * ? DELETE USER
     * * Delete a user by their ID.
     * @param {number} id - The ID of the user to be deleted.
     */
    async deleteUser(id) {
      const { TITLE_DELETE, API_URL, ALERT_DELETED } = this.val;
      const NAME = getItemName(id, this.users);

      if (confirm(`${TITLE_DELETE} ${NAME} ?`)) {
        const URL = `${API_URL}/users/${id}`;

        try {
          await deleteData(URL, this.token);
          alert(NAME + ALERT_DELETED);

        } catch (err) {
          setError(err);
        } finally {
          this.$router.push("/home");
        }
      }
    }
  }
}
</script>
