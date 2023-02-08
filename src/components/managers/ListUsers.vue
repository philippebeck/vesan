<template>
  <CardElt>
    <template #header>
      <i class="fa-solid fa-users-gear fa-2x"></i>
      <h3>List Users</h3>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <TableElt :items="users">

          <!-- Last Table Head -->
          <template #head>
            up/del
          </template>

          <!-- User Id -->
          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ users[slotProps.index]._id }})
          </template>

          <!-- User Name -->
          <template #cell-name="slotProps">
            <FieldElt :id="'name-' + users[slotProps.index]._id"
              v-model:value="getUsers()[slotProps.index].name"
              info="Update the user name"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- User Email -->
          <template #cell-email="slotProps">
            <FieldElt :id="'email-' + users[slotProps.index]._id"
              type="email"
              v-model:value="getUsers()[slotProps.index].email"
              info="Update the user email"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- User Image -->
          <template #cell-image="slotProps">
            <MediaElt :src="'/img/thumbnails/users/' + users[slotProps.index].image"
              :alt="users[slotProps.index].name"
              :title="users[slotProps.index].image">
            </MediaElt>
            <FieldElt :id="'image-' + users[slotProps.index]._id"
              type="file"
              info="Update the user image">
            </FieldElt>
          </template>

          <!-- User Alt -->
          <template #cell-alt="slotProps">
            <FieldElt :id="'alt-' + users[slotProps.index]._id"
              type="textarea"
              v-model:value="getUsers()[slotProps.index].alt"
              info="Update the user alt"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- User Pass -->
          <template #cell-pass="slotProps">
            <FieldElt :id="'pass-' + users[slotProps.index]._id"
              type="password"
              v-model:value="pass"
              info="Update the user password"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
            </FieldElt>
          </template>

          <!-- User Role -->
          <template #cell-role="slotProps">
            <FieldElt :id="'role-' + users[slotProps.index]._id"
              type="select"
              v-model:value="getUsers()[slotProps.index].role"
              :list="roles"
              info="Update the user role"
              @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
              {{ value }}
            </FieldElt>
          </template>

          <!-- User Created -->
          <template #cell-created="slotProps">
            {{ new Date(getUsers()[slotProps.index].created).toLocaleString() }}
          </template>

          <!-- User Updated -->
          <template #cell-updated="slotProps">
            {{ new Date(getUsers()[slotProps.index].updated).toLocaleString() }}
          </template>

          <template #body="slotProps">

          <!-- Update Button -->
          <BtnElt type="button"
              @click="validateUpdatedUser(users[slotProps.index]._id)" 
              class="btn-sky"
              :title="'Update ' + users[slotProps.index].name">
              <template #btn>
                <i class="fa-solid fa-edit"></i>
              </template>
            </BtnElt>

            <!-- Delete Button -->
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
      roles: []
    }
  },

  mounted() {
    this.roles = constants.ROLES_USER;
  },

  methods: {
    /**
     * GET ALL USERS
     */
    getUsers() {
      return this.users;
    },

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

        if (typeof image === "undefined") {
          image = this.users[i].image;
        }

        user.append("id", this.users[i]._id);
        user.append("name", this.users[i].name);
        user.append("email", this.users[i].email);
        user.append("image", image);
        user.append("alt", this.users[i].alt);
        user.append("role", this.users[i].role);
        user.append("pass", this.pass);
        user.append("created", this.users[i].created);
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
