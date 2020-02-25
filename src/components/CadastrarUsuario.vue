<template>
  <div class="login-form">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="dark" dark flat>
                  <v-toolbar-title>Cadastrar-se</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
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

                  <router-link to="/" class="pr-5">Voltar</router-link>
                  <v-btn class="v-button" color="dark" dark @click.stop="CadastrarUsuario">Cadastrar</v-btn>

                  <v-snackbar v-model="snackbar">
                    {{ text }}
                    <v-btn class="v-button" color="orange" text @click="snackbar = false">Close</v-btn>
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
    usuario: {}
  }),

  methods: {
    CadastrarUsuario() {
      if (this.senha == "" || this.email == "") {
        this.text = "Preencha os campos corretamentes.";
        this.snackbar = true;
      } else if (this.senha != "" && this.email != "") {
        this.snackbar = false;

        this.usuario = {
          usuario: this.email,
          senha: this.senha
        };

        Usuario.cadastrarUsuario(this.usuario)
          .then(res => {
            this.usuario = res.data;
            this.snackbar = true;
            this.text = "Usuario cadastrado.";
            this.email = this.senha = "";
          })
          .catch(erro => {
            console.log(erro);
            this.text = "Usuario já existente.";
            this.snackbar = true;
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