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
            <FieldElt :id="'name-' + users[slotProps.index]._id"
              v-model:value="getUsers()[slotProps.index].name"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.INFO_UP_NAME"/>
          </template>

          <!-- Email -->
          <template #cell-email="slotProps">
            <FieldElt :id="'email-' + users[slotProps.index]._id"
              type="email"
              v-model:value="getUsers()[slotProps.index].email"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.INFO_UP_EMAIL"/>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/users/' + users[slotProps.index].image"
              :alt="users[slotProps.index].name"
              :title="users[slotProps.index].image"/>

            <FieldElt :id="'image-' + users[slotProps.index]._id"
              type="file"
              :info="constants.INFO_UP_IMAGE"/>
          </template>

          <!-- Role -->
          <template #cell-role="slotProps">
            <FieldElt :id="'role-' + users[slotProps.index]._id"
              type="select"
              :list="constants.ROLES_USER"
              v-model:value="getUsers()[slotProps.index].role"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
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
              @click="validateUpdatedUser(users[slotProps.index]._id)" 
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
     * VALIDATE UPDATED USER
     * @param {string} id 
     */
    validateUpdatedUser(id) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {

          if (this.$serve.checkName(this.users[i].name) && 
            this.$serve.checkEmail(this.users[i].email)) {

            this.checkUpdatedUser(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED USER IF NAME | EMAIL ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedUser(i) {
      this.$serve.getData("/api/users")
        .then((users) => {
          let isReferenced = false;

          for (let j = 0; j < users.length; j++) {
            if (users[j]._id === this.users[i]._id) {
              users.splice(j, 1);
            }

            if (users[j] && users[j].name === this.users[i].name) {
              alert(this.users[i].name + this.constants.ALERT_AVAILABLE);
              isReferenced = true;
            }

            if (users[j] && users[j].email === this.users[i].email) {
              alert(this.users[i].email+ this.constants.ALERT_REFERENCED);
              isReferenced = true;
            }
          }
          this.updateUser(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updateUser(isReferenced, i) {
      if (!isReferenced) {

        let user  = new FormData();
        let image = document.getElementById(`image-${this.users[i]._id}`).files[0];

        if (image === undefined) {
          image = this.users[i].image;
        }

        user.append("name", this.users[i].name);
        user.append("email", this.users[i].email);
        user.append("image", image);
        user.append("role", this.users[i].role);
        user.append("updated", Date.now());

        this.$serve.putData(`/api/users/${this.users[i]._id}`, user)
          .then(() => {
            alert(this.users[i].name + this.constants.ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
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
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
