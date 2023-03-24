<template>
  <CardElt>
    <template #header>
      <h2 id="user">
        <i class="fa-solid fa-users-gear fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.USER_MANAGER }}
      </h2>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="users">

          <!-- Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ users[slotProps.index]._id }})
          </template>

          <!-- Name -->
          <template #cell-name="slotProps">
            <FieldElt v-model:value="getUsers()[slotProps.index].name"
              @keyup.enter="updateUser(users[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- Email -->
          <template #cell-email="slotProps">
            <FieldElt type="email"
              v-model:value="getUsers()[slotProps.index].email"
              @keyup.enter="updateUser(users[slotProps.index]._id)"
              :info="constants.INFO_UP_EMAIL"/>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/users/' + users[slotProps.index].image"
              :alt="users[slotProps.index].name"
              :title="users[slotProps.index].image"/>

            <FieldElt :id="users[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <!-- Role -->
          <template #cell-role="slotProps">
            <FieldElt type="select"
              :list="constants.ROLES_USER"
              v-model:value="getUsers()[slotProps.index].role"
              @keyup.enter="updateUser(users[slotProps.index]._id)"
              :info="constants.INFO_UP_ROLE"/>
          </template>

          <!-- Created -->
          <template #cell-created="slotProps">
            <p>
              {{ new Date(getUsers()[slotProps.index].created).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="deleteUser(users[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + users[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-trash-arrow-up fa-lg fa-fw"></i>
              </template>
            </BtnElt>
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            <p>
              {{ new Date(getUsers()[slotProps.index].updated).toLocaleString() }}
            </p>

            <BtnElt type="button"
              @click="updateUser(users[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + users[slotProps.index].name">

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
import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "UserManager",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    MediaElt,
    TableElt
  },

  props: [
    "constants", 
    "users"
  ],

  methods: {
    /**
     * GET ALL USERS
     * @returns
     */
    getUsers() {
      return this.users;
    },

    /**
     * UPDATE USER
     * @param {string} id 
     */
    updateUser(id) {
      for (let user of this.users) {
        if (user._id === id) {

          if (this.$serve.checkString(user.name) && this.$serve.checkEmail(user.email)) {

            let data  = new FormData();
            let image = document.getElementById(id).files[0] ?? user.image;

            data.append("name", user.name);
            data.append("email", user.email);
            data.append("image", image);
            data.append("role", user.role);
            data.append("updated", Date.now());

            this.$serve.putData(`/users/${id}`, data)
              .then(() => {
                alert(user.name + this.constants.ALERT_UPDATED);
              })
              .catch(err => { this.$serve.checkError(err) });
          }
        }
      }
    },

    /**
     * DELETE USER
     * @param {string} id 
     */
    deleteUser(id) {
      let userName = "";

      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {
          userName = this.users[i].name;
        }
      }

      if (confirm(`${this.constants.TITLE_DELETE} ${userName} ?`) === true) {
        this.$serve.deleteData(`/users/${id}`)
          .then(() => {
            alert(userName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
