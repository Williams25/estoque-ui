<template>
  <div class="CadastroProduto container mt-5">
    <v-row justify="center">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar Produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <input label="id_usuario" v-model="produto.id_usuario" type="hidden" required />

              <v-col cols="12">
                <v-text-field label="Nome Produto" v-model="produto.nome" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Descrição" v-model="produto.descricao" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Quantidade" v-model="produto.quantidade" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="valor" v-model="produto.valor" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1 v-button" text @click="$router.push('/produto')">Voltar</v-btn>
          <v-btn color="blue darken-1 v-button" text @click="cadastrarProduto">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="orange" class="v-button" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Produto from "../services/produtos";
export default {
  data: () => ({
    produto: {},
    id_usuario: "",
    snackbar: false,
    text: ""
  }),

  mounted() {
    this.id_usuario = JSON.parse(localStorage["usuario"]);
  },

  methods: {
    cadastrarProduto() {
      this.produto = {
        id_usuario: this.id_usuario.id,
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        quantidade: this.produto.quantidade,
        valor: this.produto.valor
      };
      Produto.cadastrarProduto(this.produto)
        .then(res => {
          this.text = "Produto Cadastrado";
          this.snackbar = true;
          this.produto = res.data;
          this.produto = {};
        })
        .catch(e => {
          this.text = "Preencha todos os campos";
          this.snackbar = true;
          e;
        });
    }
  }
};
</script>

<style scoped>
.v-button {
  outline: none;
}
</style>