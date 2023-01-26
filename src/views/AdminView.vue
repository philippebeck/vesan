<template>

  <!-- ADMIN PAGE -->
  <CardElt id="top">
    <template #header>
      <i class="blue fa-solid fa-cogs fa-2x"></i>
      <h1 class="blue anima-slideB">
        Admin
      </h1>

      <!-- Sidebar -->
      <NavElt class="sidebar">
        <template #first>
          <a href="#user"
            title="Create a user">
            <i class="fas fa-user fa-fw"></i>
          </a>
          <a href="#users"
            title="Set users">
            <i class="fas fa-users fa-fw"></i>
          </a>
        </template>

        <template #top>
          <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
        </template>
      </NavElt>
    </template>

    <template #body>

      <!-- User Part -->
      <CardElt>
        <template #header>
          <i class="fa-solid fa-users fa-2x"></i>
          <h2 id="user">
            Users
          </h2>
        </template>

        <template #body>
          <CreateUser />

          <ListUsers v-if="users.length > 0"
            :users="users"/>
        </template>
      </CardElt>
    </template>
  </CardElt>
</template>

<script>
import CreateUser from "@/components/CreateUser"
import ListUsers from "@/components/ListUsers"

export default {
  name: "AdminView",
  components: {
    CreateUser,
    ListUsers
  },

  data() {
    return {
      users: []
    }
  },

  beforeMount () {
    if (localStorage.userId) {

      this.$serve.getData("/api/users")
        .then(res => { this.users = res })
        .catch(err => { console.log(err) });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
