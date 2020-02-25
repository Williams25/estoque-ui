<template>
  <div class="login-form">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="dark" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent>
                    <v-text-field
                      id="user"
                      label="Email"
                      name="email"
                      prepend-icon="mdi-email"
                      type="text"
                      v-model="email"
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="senha"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <router-link to="/cadastroUsuario" class="pr-5">Cadastrar-se</router-link>
                  
                  <v-btn
                    :to.sync="rota.login"
                    class="v-button"
                    color="dark"
                    dark
                    @click="validaLogin"
                  >Login</v-btn>

                  <v-snackbar v-model="snackbar">
                    {{ text }}
                    <v-btn color="orange" class="v-button" text @click="snackbar = false">Close</v-btn>
                  </v-snackbar>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Usuario from "../services/usuarios";
export default {
  data: () => ({
    valida: false,
    snackbar: false,
    senha: "",
    email: "",
    text: "",
    rota: {
      login: ""
    },
    usuario: []
  }),

  methods: {
    validaLogin() {
      if (this.senha == "" || this.email == "") {
        this.text = "Preencha os campos corretamentes.";
        this.snackbar = true;
      } else if (this.senha != "" && this.email != "") {
        this.snackbar = false;
        Usuario.login(this.email, this.senha)
          .then(res => {
            this.usuario = res.data;
            this.rota.login = "produto";
          })
          .catch(erro => {
            console.log(erro);
            this.text = "Campos incorretos.";
            this.snackbar = true;
            this.rota.login;
          });
      }
    }
  }
};
</script>

<style scoped>
.v-button {
  outline: none;
}
</style>