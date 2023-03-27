<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-user-gear fa-lg"
          aria-hidden="true"></i>
        {{ constants.PROFILE_EDITOR }}
      </h1>
    </header>

    <CardElt>
      <template #header>
        <h2>{{ constants.PROFILE_SUB }}</h2>
        <b>{{ constants.INTRO_PROFILE }}</b>
      </template>

      <template #body>
        <form method="post"
          enctype="multipart/form-data">
          <ListElt :items="constants.USER_FORM">

            <!-- Name -->
            <template #item-1>
              <FieldElt v-model:value="user.name"
                @keyup.enter="updateUser()"
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
              <FieldElt type="email"
                v-model:value="user.email"
                @keyup.enter="updateUser()"
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
              <MediaElt v-if="user.image"
                :src="'/img/thumbnails/users/' + user.image"
                :alt="user.name" />

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

            <!-- Pass -->
            <template #item-4>
              <FieldElt type="password"
                v-model:value="pass"
                @keyup.enter="updateUser()"
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

          <!-- Update -->
          <BtnElt type="button"
            @click="updateUser()" 
            class="btn-sky"
            :content="constants.TITLE_UPDATE"
            :title="constants.INFO_UP_PROFILE">

            <template #btn>
              <i class="fa-solid fa-user-pen fa-lg"></i>
            </template>
          </BtnElt>

          <!-- Delete -->
          <BtnElt type="button"
            @click="deleteUser()" 
            class="btn-red"
            :content="constants.TITLE_DELETE"
            :title="constants.TITLE_DELETE_ACCOUNT">

            <template #btn>
              <i class="fa-solid fa-user-slash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>
    
    <CardElt v-if="orders.length !== 0">
      <template #header>
        <h2>{{ constants.ORDERS_SUB }}</h2>
      </template>

      <template #body>
        <TableElt :items="orders">

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
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex"

import BtnElt from "@/assets/BtnElt"
import CardElt from "@/assets/CardElt"
import FieldElt from "@/assets/FieldElt"
import ListElt from "@/assets/ListElt"
import MediaElt from "@/assets/MediaElt"
import TableElt from "@/assets/TableElt"

export default {
  name: "ProfileEditor",
  components: {
    BtnElt,
    CardElt,
    FieldElt,
    ListElt,
    MediaElt,
    TableElt
  },

  props: ["constants"],

  data() {
    return {
      pass: ""
    }
  },

  created() {
    if (this.constants.USER_ID) {
      this.$store.dispatch("readUser", this.constants.USER_ID);
      this.$store.dispatch("listUserOrders", this.constants.USER_ID);

      this.$serve.setMeta(
      this.constants.HEAD_PROFILE, 
      this.constants.META_PROFILE,
      this.constants.UI_URL,
      this.constants.UI_URL + this.constants.LOGO_SRC
    );

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
     * UPDATE USER
     */
    updateUser() {
      if (this.$serve.checkString(this.user.name) && this.$serve.checkEmail(this.user.email)) {

        let user  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.user.image;

        user.append("name", this.user.name);
        user.append("email", this.user.email);
        user.append("image", image);
        user.append("role", this.user.role);
        user.append("updated", Date.now());

        if (this.pass !== "") {
          if (this.$serve.checkPass(this.pass)) {
            user.append("pass", this.pass)
          }
        }

        this.$serve.putData(`/users/${this.user._id}`, user)
          .then(() => {
            alert(this.user.name + this.constants.ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    },

    /**
     * DELETE USER
     */
    deleteUser() {
      let userName = this.user.name;

      if (confirm(`${this.constants.TITLE_DELETE} ${userName} ?`) === true) {
        this.$serve.deleteData(`/users/${this.user._id}`)
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");

            alert(userName + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { this.$serve.checkError(err) });
      }
    }
  }
}
</script>
