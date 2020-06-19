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
                      label="Usuário"
                      name="usuario"
                      :prepend-icon="svgPath"
                      type="text"
                      v-model="loginUsuario"
                    />

                    <v-text-field
                      id="password"
                      label="Senha"
                      name="senha"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="senha"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <router-link to="/cadastroUsuario" class="pr-5">Cadastrar-se</router-link>

                  <v-btn class="v-button" color="dark" dark @click="validaLogin">Login</v-btn>
                                    
                  <v-snackbar
                    class="mt-5"
                    v-model="snackbar"
                    :color="color"
                    :multi-line="mode === 'multi-line'"
                    :right="x === 'right'"
                    :timeout="timeout"
                    :top="y === 'top'"
                    :vertical="mode === 'vertical'"
                  >
                    {{ text }}
                    <v-btn color="normal" class="v-button" text @click="snackbar = false">Fechar</v-btn>
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
import { mdiAccount } from '@mdi/js'
export default {
  data: () => ({
    svgPath: mdiAccount,
    color: "success",
    mode: "",
    snackbar: false,
    text: "",
    timeout: 3000,
    x: "right",
    y: "top",
    valida: false,
    senha: "",
    loginUsuario: "",
    usuario: []
  }),

  methods: {
    validaLogin() {
      if (this.senha == "" || this.loginUsuario == "") {
        this.text = "Preencha todos os campos corretamentes!";
        this.color = "warning";
        this.snackbar = true;
      } else if (this.senha != "" && this.loginUsuario != "") {
        this.snackbar = false;
        Usuario.login(this.loginUsuario, this.senha)
          .then(res => {
            this.usuario = res.data;
            localStorage["usuario"] = JSON.stringify({
              id: res.data.id
            });
            this.$router.push("/produto");
          })
          .catch(erro => {
            console.log(erro);
            this.text = "Erro ao realizar o login verifique usuario e senha";
            this.color = "error";
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