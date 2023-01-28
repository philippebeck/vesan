<template>

  <!-- USER CREATION ADMIN -->
  <form method="post"
    enctype="multipart/form-data"
    class="form width-lg container-60lg-50wd">
    <ListElt :items="['name', 'email', 'image', 'pass']">

      <!-- User Name -->
      <template #item-1>
        <FieldElt id="user-name"
          v-model:value="name"
          info="John Doe"
          @keyup.enter="validateNewUser()"
          :min="parseInt('2')">
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
          v-model:value="email"
          info="john@doe.com"
          @keyup.enter="validateNewUser()"
          type="email">
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
          v-model:value="pass"
          info="********"
          @keyup.enter="validateNewUser()"
          type="password">
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
      content="Create"
      @click="validateNewUser()" 
      class="btn-green"/>
  </form>
</template>

<script>
export default {
  name: "CreateUser",

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
     * VALIDATE NEW USER IF DATA ARE VALID
     */
    validateNewUser() {
      if (this.$serve.checkName(this.name) && 
        this.$serve.checkEmail(this.email) && 
        this.$serve.checkPass(this.pass)) {

        if (typeof document.getElementById('image').files[0] !== "undefined") {
          this.checkNewUser();

        } else {
          alert("Une photo de l'utilisateur doit être uploadée !");
        }
      }
    },

    /**
     * CHECK NEW USER IF NAME | EMAIL ARE REFERENCED
     */
    checkNewUser() {
      this.$serve.getData("/api/users")
        .then((users) => {
          let isReferenced = false;

          for (let i = 0; i < users.length; i++) {

            if (users[i].name === this.name) {
              alert(this.name + " is not available !");
              isReferenced = true;
            }

            if (users[i].email === this.email) {
              alert(this.email + " is already referenced !");
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
        let image = document.getElementById('image').files[0];

        user.append("name", this.name);
        user.append("email", this.email);
        user.append("image", image);
        user.append("pass", this.pass);

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