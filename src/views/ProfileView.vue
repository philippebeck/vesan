<template>
  <CardElt>
    <template #header>
      <h1 class="sky anima-slideB">
        <i class="fa-solid fa-user-gear fa-lg"
          aria-hidden="true"></i>
        Profile
      </h1>
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
              v-model:value="user.email"
              @keyup.enter="validateUpdatedUser()"
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
            <MediaElt :src="'/img/thumbnails/users/' + user.image"
              :alt="user.alt" />
            <FieldElt id="user-image"
              v-model:value="image"
              :info="constants.CREATE_IMAGE"
              type="file">
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
              @keyup.enter="validateUpdatedUser()"
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

        <!-- Update Button -->
        <BtnElt type="button"
          @click="validateUpdatedUser()" 
          class="btn-blue"
          content="Update"
          :title="constants.UPDATE_PROFILE">
          <template #btn>
            <i class="fa-solid fa-user-pen fa-lg"></i>
          </template>
        </BtnElt>

        <!-- Delete Button -->
        <BtnElt type="button"
          @click="deleteUser()" 
          class="btn-red"
          content="Delete"
          :title="constants.DELETE_ACCOUNT">
          <template #btn>
            <i class="fa-solid fa-user-slash fa-lg"></i>
          </template>
        </BtnElt>
      </form>

      <TableElt v-if="orders.length !== 0"
        :items="orders">
        <template #title>Your Orders</template>

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
                <ul :title="`Go to ${item.name} page`">
                  <li>
                    <b>{{ item.name }}</b>
                  </li>
                  <li>
                    <i>({{ item.option }})</i>
                  </li>
                  <li class="black">{{ item.quantity }}x {{ item.price }}€</li>
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
import constants from "/constants";

export default {
  name: "ProfileView",

  data() {
    return {
      constants: {},
      image: "",
      pass: ""
    }
  },

  mounted() {
    this.constants = constants;

    if (constants.USER_ID) {
      this.$store.dispatch("readUser", constants.USER_ID);
      this.$store.dispatch("listUserOrders", constants.USER_ID);

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
        this.$serve.checkEmail(this.user.email) && 
        this.$serve.checkPass(this.pass)) {

        this.checkUpdatedUser();
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
