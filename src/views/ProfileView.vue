<template>
  <CardElt>
    <template #header>
      <h1 class="sky anima-slideB">
        <i class="fa-solid fa-user-gear fa-lg"
          aria-hidden="true"></i>
        {{ constants.PROFILE_VIEW }}
      </h1>
      <p>{{ constants.INTRO_PROFILE }}</p>
    </template>

    <template #body>
      <form method="post"
        enctype="multipart/form-data">
        <ListElt :items="['name', 'email', 'image', 'pass']">

          <!-- User Name -->
          <template #item-1>
            <FieldElt id="user-name"
              v-model:value="user.name"
              @keyup.enter="validateUpdatedUser()"
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

          <!-- User Email -->
          <template #item-2>
            <FieldElt id="user-email"
              type="email"
              v-model:value="user.email"
              @keyup.enter="validateUpdatedUser()"
              :info="constants.INFO_EMAIL">

              <template #legend>
                {{ constants.LEGEND_EMAIL }}
              </template>
              <template #label>
                {{ constants.LABEL_EMAIL }}
              </template>
            </FieldElt>
          </template>
          
          <!-- User Image -->
          <template #item-3>
            <MediaElt v-if="user.image"
              :src="'/img/thumbnails/users/' + user.image"
              :alt="user.name" />

            <FieldElt id="user-image"
              v-model:value="image"
              :info="constants.INFO_IMAGE"
              type="file">

              <template #legend>
                {{ constants.LEGEND_IMAGE }}
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
              @keyup.enter="validateUpdatedUser()"
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

        <!-- Update Button -->
        <BtnElt type="button"
          @click="validateUpdatedUser()" 
          class="btn-blue"
          :content="constants.UPDATE"
          :title="constants.UPDATE_PROFILE">

          <template #btn>
            <i class="fa-solid fa-user-pen fa-lg"></i>
          </template>
        </BtnElt>

        <!-- Delete Button -->
        <BtnElt type="button"
          @click="deleteUser()" 
          class="btn-red"
          :content="constants.DELETE"
          :title="constants.DELETE_ACCOUNT">

          <template #btn>
            <i class="fa-solid fa-user-slash fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <TableElt v-if="orders.length !== 0"
        :items="orders">
        <template #title>
          {{ constants.PROFILE_ORDERS }}
        </template>

        <!-- Id -->
        <template #cell-_id="slotProps">
          <b>#{{ slotProps.index + 1 }}</b>
          ({{ orders[slotProps.index]._id }})
        </template>

        <!-- Products -->
        <template #cell-products="slotProps">
          <ul>
            <li v-for="(item, index) in orders[slotProps.index].products"
              :key="index">
              <a :href="`/product/${item.id}`">

                <ul :title="constants.TITLE_GO + item.name">
                  <li>
                    <b>{{ item.name }}</b>
                  </li>
                  <li>
                    <i>({{ item.option }})</i>
                  </li>
                  <li class="black">
                    {{ item.quantity }}x {{ item.price }}€
                  </li>
                </ul>
              </a>
            </li>
          </ul>
        </template>

        <!-- Total -->
        <template #cell-total="slotProps">
          <b>{{ orders[slotProps.index].total }} €</b>
        </template>

        <!-- Created -->
        <template #cell-created="slotProps">
          {{ new Date(orders[slotProps.index].created).toLocaleString() }}
        </template>

        <!-- Updated -->
        <template #cell-updated="slotProps">
          {{ new Date(orders[slotProps.index].updated).toLocaleString() }}
        </template>
      </TableElt>
    </template>
  </CardElt>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "ProfileView",
  props: ["constants"],

  data() {
    return {
      pass: ""
    }
  },

  mounted() {
    if (this.constants.USER_ID) {
      this.$store.dispatch("readUser", this.constants.USER_ID);
      this.$store.dispatch("listUserOrders", this.constants.USER_ID);

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  },

  computed: {
    ...mapState([
      "user", 
      "orders"
    ])
  },

  methods: {
    ...mapActions([
      "readUser", 
      "listUserOrders"
    ]),

    /**
     * CHECK SESSION
     * @param {string} role
     * @returns
     */
    checkRole(role) {
      return this.$serve.checkRole(this.user.role, role);
    },

    /**
     * VALIDATE UPDATED USER
     */
    validateUpdatedUser() {
      if (this.$serve.checkName(this.user.name) && 
        this.$serve.checkEmail(this.user.email)) {

        if (this.pass && this.$serve.checkPass(this.pass)) {
            this.checkUpdatedUser();
          
        } else {
          this.checkUpdatedUser();
        }
      }
    },

    /**
     * CHECK UPDATED USER IF NAME | EMAIL ARE REFERENCED
     */
    checkUpdatedUser() {
      let checker = new FormData();
      checker.append("name", this.name);
      checker.append("email", this.email);

      this.$serve.postData("/api/users/check", checker)
        .then((userAvailable) => {

          if (userAvailable === true) {
            this.updateUser();
          }
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE USER IF NO INFO IS REFERENCED
     */
    updateUser() {
      let user  = new FormData();
      let image = document.getElementById("user-image").files[0];

      if (typeof image === "undefined") {
        image = this.user.image;
      }

      if (this.pass !== "") {
        user.append("pass", this.pass);
      }

      user.append("name", this.user.name);
      user.append("email", this.user.email);
      user.append("image", image);
      user.append("updated", Date.now());

      this.$serve.putData(`/api/users/${this.user._id}`, user)
        .then(() => {
          alert(this.user.name + this.constants.UPDATED);
          this.$router.go();
        })
        .catch(err => { console.log(err) });
    },

    /**
     * DELETE USER
     */
    deleteUser() {
      let userName = this.user.name;

      if (confirm(`${this.constants.DELETE} ${userName} ?`) === true) {
        this.$serve.deleteData(`/api/users/${this.user._id}`)
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");

            alert(userName + this.constants.DELETED);
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
