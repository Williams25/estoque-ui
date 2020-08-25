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
                      label="Usuário"
                      name="usuario"
                      :prepend-icon="svgPath"
                      type="text"
                      v-model="cadastroUsuario"
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

                  <router-link to="/" class="pr-5">Voltar</router-link>
                  <v-btn
                    class="v-button"
                    color="dark"
                    dark
                    @click.stop.prevent="CadastrarUsuario"
                  >Cadastrar</v-btn>

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
import { mdiAccount } from "@mdi/js";
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
    cadastroUsuario: "",
    usuario: {}
  }),

  methods: {
    CadastrarUsuario() {
      if (this.senha == "" || this.cadastroUsuario == "") {
        this.text = "Preencha todos os campos corretamentes!";
        this.color = "warning";
        this.snackbar = true;
      } else if (this.senha.length < 3) {
        this.text = "A senha deve conter no minimo 3 caracteres!";
        this.color = "warning";
        return (this.snackbar = true);
      } else if (this.senha != "" && this.cadastroUsuario != "") {
        this.snackbar = false;

        this.usuario = {
          usuario: this.cadastroUsuario,
          senha: this.senha
        };

        Usuario.cadastrarUsuario(this.usuario)
          .then(res => {
            this.usuario = res.data;
            this.text = "Usuario cadastrado com sucesso!";
            this.color = "success";
            this.snackbar = true;
            this.cadastroUsuario = this.senha = "";
          })
          .catch(erro => {
            this.text = "Erro usuario não disponivel!";
            this.color = "error";
            this.snackbar = true;
            erro;
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