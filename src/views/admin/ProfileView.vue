<template>
  <main>
    <header>
      <h1 class="sky-dark">
        <i class="fa-solid fa-user-gear fa-lg"></i>
        {{ val.PROFILE_EDITOR }}
      </h1>

      <BtnElt v-if="checkSession('editor')"
        href="/admin"
        class="btn-green"
        :content="val.CONTENT_ADMIN"
        :title="val.TITLE_ADMIN">
        <template #btn>
          <i class="fa-solid fa-gears fa-lg"></i>
        </template>
      </BtnElt>

      <BtnElt type="button"
        @click="logout()" 
        class="btn-orange"
        :content="val.CONTENT_LOGOUT"
        :title="val.TITLE_LOGOUT">
        <template #btn>
          <i class="fa-solid fa-right-from-bracket fa-lg"></i>
        </template>
      </BtnElt>
    </header>

    <CardElt>
      <template #header>
        <h2>{{ val.PROFILE_SUB }}</h2>
        <b>{{ val.INTRO_PROFILE }}</b>
      </template>

      <template #body>
        <form enctype="multipart/form-data">
          <ListElt :items="val.USER_FORM">

            <template #item-1>
              <FieldElt v-model:value="user.name"
                @keyup.enter="updateUser()"
                :info="val.INFO_NAME"
                :min="2">
                <template #legend>{{ val.LEGEND_NAME }}</template>
                <template #label>{{ val.LABEL_NAME }}</template>
              </FieldElt>
            </template>

            <template #item-2>
              <FieldElt type="email"
                v-model:value="user.email"
                @keyup.enter="updateUser()"
                :info="val.INFO_EMAIL">
                <template #legend>{{ val.LEGEND_EMAIL }}</template>
                <template #label>{{ val.LABEL_EMAIL }}</template>
              </FieldElt>
            </template>
            
            <template #item-3>
              <MediaElt v-if="user.image"
                :src="'/img/thumbnails/users/' + user.image"
                :alt="user.name" />
              <FieldElt id="image"
                type="file"
                v-model:value="image"
                :info="val.INFO_IMAGE">
                <template #legend>{{ val.LEGEND_IMAGE }}</template>
                <template #label>{{ val.LABEL_IMAGE }}</template>
              </FieldElt>
            </template>

            <template #item-4>
              <FieldElt type="password"
                v-model:value="pass"
                @keyup.enter="updateUser()"
                :info="val.INFO_PASSWORD">
                <template #legend>{{ val.LEGEND_PASSWORD }}</template>
                <template #label>{{ val.LABEL_PASSWORD }}</template>
              </FieldElt>
            </template>
          </ListElt>

          <BtnElt type="button"
            @click="updateUser()" 
            class="btn-sky"
            :content="val.TITLE_UPDATE"
            :title="val.INFO_UP_PROFILE">
            <template #btn>
              <i class="fa-solid fa-user-pen fa-lg"></i>
            </template>
          </BtnElt>

          <BtnElt type="button"
            @click="deleteUser()" 
            class="btn-red"
            :content="val.TITLE_DELETE"
            :title="val.TITLE_DELETE_ACCOUNT">
            <template #btn>
              <i class="fa-solid fa-user-slash fa-lg"></i>
            </template>
          </BtnElt>
        </form>
      </template>
    </CardElt>
    
    <CardElt v-if="orders.length !== 0">
      <template #header>
        <h2>{{ val.ORDERS_SUB }}</h2>
      </template>

      <template #body>
        <TableElt :items="orders">

          <template #cell-id="slotProps">
            <b>#{{ slotProps.index + 1 }}</b>
            ({{ orders[slotProps.index].id }})
          </template>

          <template #cell-products="slotProps">
            <ul>
              <li v-for="(item, index) in orders[slotProps.index].products"
                :key="index">
                <a :href="`/product/${item.id}`">

                  <ul :title="val.TITLE_GO + item.name">
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
import BtnElt from "@/assets/elements/BtnElt"
import CardElt from "@/assets/elements/CardElt"
import FieldElt from "@/assets/elements/FieldElt"
import ListElt from "@/assets/elements/ListElt"
import MediaElt from "@/assets/elements/MediaElt"
import TableElt from "@/assets/elements/TableElt"

import { checkRange, checkRegex, checkRole, deleteData, putData, setError, setMeta } from "servidio"
import { mapState, mapActions } from "vuex"

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

  props: ["val"],

  data() {
    return {
      image: "",
      pass: ""
    }
  },

  created() {
    if (this.val.USER_ID) {
      this.$store.dispatch("readUser", this.val.USER_ID);
      this.$store.dispatch("listUserOrders", this.val.USER_ID);

      setMeta(
      this.val.HEAD_PROFILE, 
      this.val.META_PROFILE,
      this.val.UI_URL,
      this.val.UI_URL + this.val.LOGO_SRC
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
      const NAME_MSG    = this.val.CHECK_STRING;
      const EMAIL_MSG   = this.val.CHECK_EMAIL;
      const EMAIL_REGEX = this.val.REGEX_EMAIL;

      if (checkRange(this.user.name, NAME_MSG) && 
          checkRegex(this.user.email, EMAIL_MSG, EMAIL_REGEX)) {

        let user  = new FormData();
        let image = document.getElementById("image").files[0] ?? this.user.image;

        user.append("name", this.user.name);
        user.append("email", this.user.email);
        user.append("image", image);
        user.append("role", this.user.role);
        user.append("updated", Date.now());

        const PASS_MSG   = this.val.CHECK_PASS;
        const PASS_REGEX = this.val.REGEX_PASS;

        if (this.pass !== "") {
          if (checkRegex(this.pass, PASS_MSG, PASS_REGEX)) {
            user.append("pass", this.pass)
          }
        }

        console.log(user);

        putData(this.val.API_URL + "/users/" + this.user.id, user)
          .then(() => {
            alert(this.user.name + this.val.ALERT_UPDATED);
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

      if (confirm(`${this.val.TITLE_DELETE} ${name} ?`) === true) {
        deleteData(this.val.API_URL + "/users/" + this.user.id)
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");

            alert(name + this.val.ALERT_DELETED);
            this.$router.go();
          })
          .catch(err => { setError(err) });
      }
    }
  }
}
</script>
