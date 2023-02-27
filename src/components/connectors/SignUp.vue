<template>
  <form method="post"
    enctype="multipart/form-data">
    <ListElt :items="['name', 'email', 'image', 'pass']">

      <!-- Name -->
      <template #item-1>
        <FieldElt id="user-name"
          v-model:value="name"
          :info="constants.INFO_NAME"
          :min="2">

          <template #legend>
            {{ constants.LEGEND_NAME }}
          </template>
          <template #label>
            {{ constants.LABEL_NAME }}
          </template>
        </FieldElt>
      </template>

      <!-- Email -->
      <template #item-2>
        <FieldElt id="user-email"
          type="email"
          v-model:value="email"
          :info="constants.INFO_EMAIL">

          <template #legend>
            {{ constants.LEGEND_EMAIL }}
          </template>
          <template #label>
            {{ constants.LABEL_EMAIL }}
          </template>
        </FieldElt>
      </template>
      
      <!-- Image -->
      <template #item-3>
        <FieldElt id="user-image"
          type="file"
          v-model:value="image"
          :info="constants.INFO_IMAGE">

          <template #legend>
            {{ constants.LEGEND_IMAGE }}
          </template>
          <template #label>
            {{ constants.LABEL_IMAGE }}
          </template>
        </FieldElt>
      </template>

      <!-- Pass -->
      <template #item-4>
        <FieldElt id="user-pass"
          type="password"
          v-model:value="pass"
          :info="constants.INFO_PASSWORD">

          <template #legend>
            {{ constants.LEGEND_PASSWORD }}
          </template>
          <template #label>
            {{ constants.LABEL_PASSWORD }}
          </template>
        </FieldElt>
      </template>
    </ListElt>

    <!-- Create -->
    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY">
      <BtnElt type="button"
        class="btn-blue"
        :content="constants.CONTENT_CREATE"
        :title="constants.TITLE_SIGNUP">

        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>
    </vue-recaptcha>
  </form>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "CreateUser",
  components: { VueRecaptcha },
  props: ["constants"],

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

        if (document.getElementById('user-image').files[0] !== undefined) {
          this.checkNewUser();

        } else {
          alert(this.constants.IMG_USER);
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
      user.append("pass", this.pass);
      user.append("role", "user");
      user.append("created", Date.now());
      user.append("updated", Date.now());

      this.$serve.postData("/api/users", user)
        .then(() => {
          alert(this.name + this.constants.CREATED);
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    }
  }
}
</script>