<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="!user">
        <v-card-title class="headline"> Login </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              prepend-inner-icon="mdi-at"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              outlined
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card v-if="user">
        <v-card-title class="headline"> User </v-card-title>
        <v-card-text>
          <div>Hello {{ user ? user.pseudo : null }}</div>
          <v-btn color="error" class="mr-4" @click="logout"> Logout </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserPage",

  // TODO validation of the form
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPassword: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      this.login();
    },

    login() {
      this.$axios
        .$post("users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("drawerlinkToken", JSON.stringify(res));
          this.$store.commit("user/set", res);
        });
    },

    logout() {
      this.$store.commit("user/logout");
    },
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
