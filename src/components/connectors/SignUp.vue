<template>
  <form method="post"
    enctype="multipart/form-data">
    <ListElt :items="['name', 'email', 'image', 'pass']">

      <!-- User Name -->
      <template #item-1>
        <FieldElt id="user-name"
          v-model:value="name"
          @keyup.enter="validateNewUser()"
          info="John Doe"
          :min="2">
          <template #legend>
            Name
          </template>
          <template #label>
            Indicate the user name
          </template>
        </FieldElt>
      </template>

      <!-- User Email -->
      <template #item-2>
        <FieldElt id="user-email"
          type="email"
          v-model:value="email"
          @keyup.enter="validateNewUser()"
          info="john@doe.com">
          <template #legend>
            Email
          </template>
          <template #label>
            Indicate the user email
          </template>
        </FieldElt>
      </template>
      
      <!-- User Image -->
      <template #item-3>
        <FieldElt id="user-image"
          v-model:value="image"
          info="Image file only"
          type="file">
          <template #legend>
            Image
          </template>
          <template #label>
            Provide user image
          </template>
        </FieldElt>
      </template>

      <!-- User Pass -->
      <template #item-4>
        <FieldElt id="user-pass"
          type="password"
          v-model:value="pass"
          @keyup.enter="validateNewUser()"
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

    <!-- Create Button -->
    <BtnElt type="button"
      content="SignUp"
      @click="validateNewUser()" 
      class="btn-blue"
      title="SignUp for a new User">
      <template #btn>
        <i class="fa-solid fa-square-plus fa-lg"></i>
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
      name: "",
      email: "",
      image:"",
      alt:"",
      pass: ""
    }
  },

  methods: {
    /**
     * VALIDATE NEW USER IF DATA ARE VALID
     */
    validateNewUser() {
      if (this.$serve.checkName(this.name) && 
        this.$serve.checkEmail(this.email) && 
        this.$serve.checkPass(this.pass)) {

        if (typeof document.getElementById('user-image').files[0] !== "undefined") {
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
      this.$serve.getData("/api/users/check")
        .then((users) => {
          let isReferenced = false;

          for (let i = 0; i < users.length; i++) {

            if (users[i].name === this.name) {
              alert(this.name + constants.CHECK_AVAILABLE);
              isReferenced = true;
            }

            if (users[i].email === this.email) {
              alert(this.email + constants.CHECK_REFERENCE);
              isReferenced = true;
            }
          }

          this.createUser(isReferenced);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * CREATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createUser(isReferenced) {
      if (!isReferenced) {
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
}
</script>