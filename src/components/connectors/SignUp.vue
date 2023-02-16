<template>
  <form method="post"
    enctype="multipart/form-data">
    <ListElt :items="['name', 'email', 'image', 'pass']">

      <!-- User Name -->
      <template #item-1>
        <FieldElt id="user-name"
          v-model:value="name"
          @keyup.enter="validateNewUser()"
          :info="constants.CREATE_NAME"
          :min="2">
          <template #legend>
            Name
          </template>
          <template #label>
            {{ constants.LABEL_NAME }}
          </template>
        </FieldElt>
      </template>

      <!-- User Email -->
      <template #item-2>
        <FieldElt id="user-email"
          type="email"
          v-model:value="email"
          @keyup.enter="validateNewUser()"
          :info="constants.CREATE_EMAIL">
          <template #legend>
            Email
          </template>
          <template #label>
            {{ constants.LABEL_EMAIL }}
          </template>
        </FieldElt>
      </template>
      
      <!-- User Image -->
      <template #item-3>
        <FieldElt id="user-image"
          type="file"
          v-model:value="image"
          :info="constants.CREATE_IMAGE">
          <template #legend>
            Image
          </template>
          <template #label>
            {{ constants.LABEL_IMAGE }}
          </template>
        </FieldElt>
      </template>

      <!-- User Pass -->
      <template #item-4>
        <FieldElt id="user-pass"
          type="password"
          v-model:value="pass"
          @keyup.enter="validateNewUser()"
          :info="constants.CREATE_PASSWORD">
          <template #legend>
            Password
          </template>
          <template #label>
            {{ constants.LABEL_PASSWORD }}
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create Button -->
    <BtnElt type="button"
      @click="validateNewUser()" 
      class="btn-blue"
      content="Create"
      :title="constants.BUTTON_SIGNUP">
      <template #btn>
        <i class="fa-solid fa-user-plus fa-lg"></i>
      </template>
    </BtnElt>
  </form>
</template>

<script>
import constants from "/constants";

export default {
  name: "CreateUser",

  data() {
    return {
      constants: {},
      name: "",
      email: "",
      image:"",
      alt:"",
      pass: ""
    }
  },

  mounted() {
    this.constants = constants;
  },

  methods: {
    /**
     * VALIDATE NEW USER IF DATA ARE VALID
     */
    validateNewUser() {
      if (this.$serve.checkName(this.name) && 
        this.$serve.checkEmail(this.email) && 
        this.$serve.checkPass(this.pass)) {

        if (document.getElementById('user-image').files[0] !== undefined) {
          this.checkNewUser();

        } else {
          alert("A photo of the user must be uploaded !");
        }
      }
    },

    /**
     * CHECK NEW USER IF NAME | EMAIL ARE REFERENCED
     */
    checkNewUser() {
      let checker = new FormData();
      checker.append("name", this.name);
      checker.append("email", this.email);

      this.$serve.postData("/api/users/check", checker)
        .then((userAvailable) => {

          if (userAvailable === true) {
            this.createUser();
          }
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createUser() {
      let user  = new FormData();
      let image = document.getElementById('user-image').files[0];

      user.append("name", this.name);
      user.append("email", this.email);
      user.append("image", image);
      user.append("alt", this.name);
      user.append("pass", this.pass);
      user.append("role", "user");
      user.append("created", Date.now());
      user.append("updated", Date.now());

      this.$serve.postData("/api/users", user)
        .then(() => {
          alert(user.get("name") + " created !");
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>