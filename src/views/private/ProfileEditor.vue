<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-user-gear fa-lg"
          aria-hidden="true"></i>
        {{ constants.PROFILE_EDITOR }}
      </h1>

      <BtnElt v-if="checkSession('editor')"
        href="/admin"
        class="btn-green"
        :content="constants.CONTENT_ADMIN"
        :title="constants.TITLE_ADMIN">

        <template #btn>
          <i class="fa-solid fa-gears fa-lg"></i>
        </template>
      </BtnElt>

      <BtnElt type="button"
        @click="logout()" 
        class="btn-orange"
        :content="constants.CONTENT_LOGOUT"
        :title="constants.TITLE_LOGOUT">

        <template #btn>
          <i class="fa-solid fa-right-from-bracket fa-lg"></i>
        </template>
      </BtnElt>
    </header>

    <CardElt>
      <template #header>
        <h2>{{ constants.PROFILE_SUB }}</h2>
        <b>{{ constants.INTRO_PROFILE }}</b>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="constants.USER_FORM">

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

          <BtnElt type="button"
            @click="updateUser()" 
            class="btn-sky"
            :content="constants.TITLE_UPDATE"
            :title="constants.INFO_UP_PROFILE">

            <template #btn>
              <i class="fa-solid fa-user-pen fa-lg"></i>
            </template>
          </BtnElt>

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

          <template #cell-_id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ orders[slotProps.index]._id }})
          </template>

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

          <template #cell-total="slotProps">
            <b>{{ orders[slotProps.index].total }} €</b>
          </template>

          <template #cell-created="slotProps">
            {{ new Date(orders[slotProps.index].created).toLocaleString() }}
          </template>

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
import { checkRange, checkRegex, checkRole, deleteData, putData, setError, setMeta } from "../assets/serve"

import BtnElt from "../assets/elements/BtnElt"
import CardElt from "../assets/elements/CardElt"
import FieldElt from "../assets/elements/FieldElt"
import ListElt from "../assets/elements/ListElt"
import MediaElt from "../assets/elements/MediaElt"
import TableElt from "../assets/elements/TableElt"

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
      image: "",
      pass: ""
    }
  },

  created() {
    if (this.constants.USER_ID) {
      this.$store.dispatch("readUser", this.constants.USER_ID);
      this.$store.dispatch("listUserOrders", this.constants.USER_ID);

      setMeta(
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
    checkSession(role) {
      return checkRole(this.user.role, role);
    },

    /**
     * LOGOUT
     */
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
      this.$router.go();
    },

    /**
     * UPDATE USER
     */
    updateUser() {
      const NAME_MSG    = this.constants.CHECK_STRING;
      const EMAIL_MSG   = this.constants.CHECK_EMAIL;
      const EMAIL_REGEX = this.constants.REGEX_EMAIL;

      if (checkRange(this.user.name, NAME_MSG) && 
          checkRegex(this.user.email, EMAIL_MSG, EMAIL_REGEX)) {

        let user  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.user.image;

        user.append("name", this.user.name);
        user.append("email", this.user.email);
        user.append("image", image);
        user.append("role", this.user.role);
        user.append("updated", Date.now());

        const PASS_MSG   = this.constants.CHECK_PASS;
        const PASS_REGEX = this.constants.REGEX_PASS;

        if (this.pass !== "") {
          if (checkRegex(this.pass, PASS_MSG, PASS_REGEX)) {
            user.append("pass", this.pass)
          }
        }

        putData(this.constants.API_URL + "/users/" + this.user._id, user)
          .then(() => {
            alert(this.user.name + this.constants.ALERT_UPDATED);
            this.$router.go();
          })
          .catch(err => { setError(err) });
      }
    },

    /**
     * DELETE USER
     */
    deleteUser() {
      let name = this.user.name;

      if (confirm(`${this.constants.TITLE_DELETE} ${name} ?`) === true) {
        deleteData(this.constants.API_URL + "/users/" + this.user._id)
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");

            alert(name + this.constants.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
