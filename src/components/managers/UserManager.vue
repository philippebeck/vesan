<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-users-gear fa-lg"
          aria-hidden="true">
        </i>
        {{ constants.USER_MANAGER }}
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="users">

          <template #head>
            {{ constants.HEAD_UP }}
          </template>

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
            {{ new Date(getUsers()[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(getUsers()[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

            <!-- Update -->
            <BtnElt type="button"
              @click="updateUser(users[slotProps.index]._id)" 
              class="btn-sky"
              :title="constants.TITLE_UPDATE + users[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteUser(users[slotProps.index]._id)" 
              class="btn-red"
              :title="constants.TITLE_DELETE + users[slotProps.index].name">

              <template #btn>
                <i class="fa-solid fa-trash-alt"></i>
              </template>
            </BtnElt>
          </template>
        </TableElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "UserManager",
  props: ["constants", "users"],

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

          if (this.$serve.checkName(user.name) && this.$serve.checkEmail(user.email)) {

            let data  = new FormData();
            let image = document.getElementById(id).files[0] ?? user.image;

            data.append("name", user.name);
            data.append("email", user.email);
            data.append("image", image);
            data.append("role", user.role);
            data.append("created", user.created);
            data.append("updated", Date.now());

            this.$serve.putData(`/api/users/${id}`, data)
              .then(() => {
                alert(user.name + this.constants.ALERT_UPDATED);
                this.$router.go();
              })
              .catch(err => { alert(err.response.data.message) });
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
        this.$serve.deleteData(`/api/users/${id}`)
          .then(() => {
            alert(userName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { alert(err.response.data.message) });
      }
    }
  }
}
</script>
