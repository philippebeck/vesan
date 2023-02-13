<template>

  <!-- CONTACT PAGE -->
  <CardElt>
    <template #header>
      <i class="blue anima-slideR fa-solid fa-at fa-4x"></i>
      <h1 class="sky anima-slideL">
        Contact
      </h1>
    </template>

    <template #body>
      <form>
        <ListElt :items="['email', 'subject', 'text']">

          <!-- User Email -->
          <template #item-1>
            <FieldElt id="email"
              type="email"
              v-model:value="email"
              @keyup.enter="send()"
              class="anima-slideR"
              info="An email to answer you ?">
              <template #legend>
                Email
              </template>
              <template #label>
                A functional email please!
              </template>
            </FieldElt>
          </template>

          <!-- Message Subject -->
          <template #item-2>
            <FieldElt id="subject"
              v-model:value="subject"
              @keyup.enter="send()"
              class="anima-slideL"
              info="The subject of your message ?">
              <template #legend>
                Subject
              </template>
              <template #label>
                Be brief and precise!
              </template>
            </FieldElt>
          </template>

          <!-- Message Content -->
          <template #item-3>
            <FieldElt id="text"
              type="textarea"
              v-model:value="text"
              @keyup.enter="send()"
              class="anima-slideR"
              info="The text of your message ?"
              :max="100">
              <template #legend>
                Text
              </template>
              <template #label>
                What can I do for you ?
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <!-- Security -->
        <div id="recaptcha" 
          class="g-recaptcha" 
          data-sitekey="">
        </div>

        <!-- Send Button -->
        <BtnElt type="button"
          @click="send()" 
          class="btn-green anima-slideL"
          content="Send"
          title="Send a Message">
          <template #btn>
            <i class="fa-regular fa-paper-plane fa-lg"></i>
          </template>
        </BtnElt>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ContactView",

  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  methods: {
    /**
     * SEND A CONTACT MESSAGE
     */
    send() {
      if (this.$serve.checkEmail(this.email) && 
      this.$serve.checkName(this.subject)) {
        let message = new FormData();

        message.append("email", this.email);
        message.append("subject", this.subject);
        message.append("text", this.text);

        this.$serve.postData("/api/users/send", message)
          .then(() => {
            alert(message.get("subject") + " sended !");
            this.$router.push("/");
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>
