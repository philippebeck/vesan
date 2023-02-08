<template>
  <CardElt>
    <template #header>
      <i class="blue anima-slideT fa-solid fa-user-gear fa-2x"></i>
      <h1 class="sky anima-slideB">Profile</h1>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['name', 'email', 'image', 'pass']">

          <!-- User Name -->
          <template #item-1>
            <FieldElt id="user-name"
              v-model:value="this.user.name"
              @keyup.enter="validateUpdatedUser()"
              info="John Doe"
              :min="2">
              <template #legend>
                Name
              </template>
              <template #label>
                Indicate your name
              </template>
            </FieldElt>
          </template>

          <!-- User Email -->
          <template #item-2>
            <FieldElt id="user-email"
              type="email"
              v-model:value="this.user.email"
              @keyup.enter="validateUpdatedUser()"
              info="john@doe.com">
              <template #legend>
                Email
              </template>
              <template #label>
                Indicate your email
              </template>
            </FieldElt>
          </template>
          
          <!-- User Image -->
          <template #item-3>
            <MediaElt :src="'/img/thumbnails/users/' + this.user.image"
              :alt="this.user.name">
            </MediaElt>
            <FieldElt id="user-image"
              v-model:value="image"
              info="Image file only"
              type="file">
              <template #legend>
                Image
              </template>
              <template #label>
                Provide your photo
              </template>
            </FieldElt>
          </template>

          <!-- User Pass -->
          <template #item-4>
            <FieldElt id="user-pass"
              type="password"
              v-model:value="pass"
              @keyup.enter="validateUpdatedUser()"
              info="********">
              <template #legend>
                Password
              </template>
              <template #label>
                8 to 50 characters with upper & lower, 1 number mini & no space
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Update Button -->
        <BtnElt type="button"
          content="Update"
          @click="validateUpdatedUser()" 
          class="btn-blue"
          title="Update your profile">
          <template #btn>
            <i class="fa-solid fa-user-pen fa-lg"></i>
          </template>
        </BtnElt>

        <!-- Delete Button -->
        <BtnElt type="button"
          content="Delete"
          @click="deleteUser()" 
          class="btn-red"
          title="Delete your account">
          <template #btn>
            <i class="fa-solid fa-user-slash fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
import constants from "/constants";

export default {
  name: "ProfileView",

  data() {
    return {
      users: [],
      user: {},
      image: "",
      pass: ""
    }
  },

  mounted() {
    this.$serve.getData("/api/users/check")
      .then(res => { 
        this.users = res;

        if (this.checkSession("user")) {
          this.$serve.getData("/api/users/" + constants.USER_ID)
            .then(res => { this.user = res })
            .catch(err => { console.log(err) });

        } else {
          alert("Go back Home !");
          this.$router.push("/");
        }
      })
      .catch(err => { console.log(err) });
  },

  methods: {
    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkSession(role) {
      return this.$serve.checkSession(this.users, role);
    },

    /**
     * VALIDATE UPDATED USER
     */
    validateUpdatedUser() {
      if (this.$serve.checkName(this.user.name) && 
        this.$serve.checkEmail(this.user.email) && 
        this.$serve.checkPass(this.pass)) {

        this.checkUpdatedUser();
      }
    },

    /**
     * CHECK UPDATED USER IF NAME | EMAIL ARE REFERENCED
     */
    checkUpdatedUser() {
        let isReferenced = false;

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id === this.user._id) {
            this.users.splice(i, 1);
          }

          if (this.users[i] && this.users[i].name === this.user.name) {
            alert(this.users[i].name + constants.CHECK_AVAILABLE);
            isReferenced = true;
          }

          if (this.users[i] && this.users[i].email === this.user.email) {
            alert(this.users[i].email+ constants.CHECK_REFERENCE);
            isReferenced = true;
          }
        }
        this.updateUser(isReferenced);
    },

    /**
     * UPDATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    updateUser(isReferenced) {
      if (!isReferenced) {

        let user  = new FormData();
        let image = document.getElementById("user-image").files[0];

        if (typeof image === "undefined") {
          image = this.user.image;
        }

        user.append("id", this.user._id);
        user.append("name", this.user.name);
        user.append("email", this.user.email);
        user.append("image", image);
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
     */
    deleteUser() {
      let userName = this.user.name;

      if (confirm(`Delete ${userName} ?`) === true) {
        this.$serve.deleteData(`/api/users/${this.user._id}`)
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
