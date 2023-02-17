<template>
  <CardElt>
    <template #header>
      <h3>
        <i class="fa-solid fa-users-gear fa-lg"
          aria-hidden="true">
        </i>
        List Users
      </h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="users">
          <template #head>up/del</template>

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
              :info="constants.UPDATE_NAME"/>
          </template>

          <!-- Email -->
          <template #cell-email="slotProps">
            <FieldElt :id="'email-' + users[slotProps.index]._id"
              type="email"
              v-model:value="getUsers()[slotProps.index].email"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.UPDATE_EMAIL"/>
          </template>

          <!-- Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/users/' + users[slotProps.index].image"
              :alt="users[slotProps.index].name"
              :title="users[slotProps.index].image"/>
            <FieldElt :id="'image-' + users[slotProps.index]._id"
              type="file"
              :info="constants.UPDATE_IMAGE"/>
          </template>

          <!-- Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + users[slotProps.index]._id"
              type="textarea"
              v-model:value="getUsers()[slotProps.index].alt"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.UPDATE_ALT"/>
          </template>

          <!-- Pass -->
          <template #cell-pass="slotProps">
            <FieldElt :id="'pass-' + users[slotProps.index]._id"
              type="password"
              v-model:value="pass"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.UPDATE_PASSWORD"/>
          </template>

          <!-- Role -->
          <template #cell-role="slotProps">
            <FieldElt :id="'role-' + users[slotProps.index]._id"
              type="select"
              :list="constants.ROLES_USER"
              v-model:value="getUsers()[slotProps.index].role"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)"
              :info="constants.UPDATE_ROLE"/>
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
              :title="'Update ' + users[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete -->
            <BtnElt type="button"
              @click="deleteUser(users[slotProps.index]._id)" 
              class="btn-red"
              :title="'Delete ' + users[slotProps.index].name">
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
import constants from "/constants";

export default {
  name: "ListUsers",
  props: ["users"],

  data() {
    return {
      pass: "",
      constants: {}
    }
  },

  mounted() {
    this.constants = constants;
  },

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
            this.$serve.checkEmail(this.users[i].email) && 
            this.$serve.checkPass(this.pass)) {

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
              alert(this.users[i].name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (users[j] && users[j].email === this.users[i].email) {
              alert(this.users[i].email+ constants.CHECK_REFERENCE);
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
        let image = document.getElementById('image-' + this.users[i]._id).files[0];

        if (image !== undefined) {
          user.append("image", image);
        }

        user.append("id", this.users[i]._id);
        user.append("name", this.users[i].name);
        user.append("email", this.users[i].email);
        user.append("alt", this.users[i].alt);
        user.append("role", this.users[i].role);
        user.append("pass", this.pass);
        user.append("updated", Date.now());

        this.$serve.putData(`/api/users/${user.get("id")}`, user)
          .then(() => {
            alert(user.get("name") + " updated !");
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

      if (confirm(`Delete ${userName} ?`) === true) {
        this.$serve.deleteData(`/api/users/${id}`)
          .then(() => {
            alert(userName + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
