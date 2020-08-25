<template>
  <div class="CadastroProduto container">
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
                <v-text-field type="text" label="Nome Produto" v-model="produto.nome" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="text" label="Descrição" v-model="produto.descricao" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  label="Quantidade exemplo:(1, 100)"
                  v-model="produto.quantidade"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  label="Valor exemplo:(2.99, 100.00)"
                  v-model="produto.valor"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <b-button variant="danger" class="ml-2 mr-2" @click="$router.push('/produto')">Voltar</b-button>
          <b-button variant="primary" class="ml-2 mr-2" @click="cadastrarProduto">Salvar</b-button>
        </v-card-actions>
      </v-card>
    </v-row>

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
  </div>
</template>

<script>
import Produto from "../services/produtos";
export default {
  data: () => ({
    color: "success",
    mode: "",
    snackbar: false,
    text: "",
    timeout: 3000,
    x: "right",
    y: "top",
    produto: {},
    id_usuario: ""
  }),

  mounted() {
    if (!this.recuperaStorage()) {
      return this.$router.push("/");
    }
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

      if (
        !this.produto.nome ||
        !this.produto.descricao ||
        !this.produto.quantidade ||
        !this.produto.valor ||
        !this.produto.id_usuario
      ) {
        this.text = "Preencha todos os campos!";
        this.color = "warning";
        return (this.snackbar = true);
      }

      Produto.cadastrarProduto(this.produto)
        .then(res => {
          this.produto = res.data;
          this.produto = {};
          this.text = "Produto cadastrado com sucesso!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(erro => {
          this.text = erro.response.data.message;
          this.color = "error";
          this.snackbar = true;
        });
    },
    recuperaStorage() {
      try {
        this.id_usuario = JSON.parse(localStorage["usuario"]);
        return true;
      } catch (error) {
        return false;
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