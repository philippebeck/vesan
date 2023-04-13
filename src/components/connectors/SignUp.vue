<template>
  <form enctype="multipart/form-data">
    <ListElt :items="constants.USER_FORM">

      <template #item-1>
        <FieldElt v-model:value="name"
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

      <template #item-2>
        <FieldElt type="email"
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
      
      <template #item-3>
        <FieldElt id="image"
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

      <template #item-4>
        <FieldElt type="password"
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

    <vue-recaptcha :sitekey="constants.RECAPTCHA_KEY"
      @verify="onVerify">
      <BtnElt type="button"
        class="btn-blue"
        :content="constants.CONTENT_SIGNUP"
        :title="constants.TITLE_SIGNUP">

        <template #btn>
          <i class="fa-solid fa-user-plus fa-lg"></i>
        </template>
      </BtnElt>
    </vue-recaptcha>
  </form>
</template>

<script>
import BtnElt from "@/assets/BtnElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"

import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "SignUp",
  components: {  
    BtnElt,
    FieldElt,
    ListElt,
    VueRecaptcha 
  },

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
     * ON VERIFY
     * @param {object} response 
     */
    onVerify(response) {
      if (this.$serve.checkString(this.name) && 
        this.$serve.checkEmail(this.email) && 
        this.$serve.checkPass(this.pass)) {

        this.$serve.postData('/auth/recaptcha', { response: response })
          .then(result => {
            if (result.success) {
              this.createUser();

            } else {
              alert("Failed captcha verification");
            }
          })
          .catch(err => { 
            this.$serve.checkError(err);
            this.$router.go();
          });
      }
    },

    /**
     * CREATE USER
     */
    createUser() {
      let image = document.getElementById("image").files[0];

      if (image !== undefined) {
        let user = new FormData();

        user.append("name", this.name);
        user.append("email", this.email);
        user.append("image", image);
        user.append("pass", this.pass);
        user.append("role", "user");
        user.append("created", Date.now());
        user.append("updated", Date.now());

        this.$serve.postData("/users", user)
          .then(() => {
            alert(this.name + this.constants.ALERT_CREATED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });

      } else {
        alert(this.constants.ALERT_IMG);
      }
    }
  }
}
</script>