<template>
  <section class="produto mt-5">
    <v-data-table
      :headers="headers"
      :items="produto"
      sort-by="produtos"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-card-title>
            Estoque de Produtos
            <v-spacer></v-spacer>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar produto"
            single-line
            hide-details
          ></v-text-field>

          <!-- Modal para editar  -->
          <v-dialog v-model="dialogEditar" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="produto.nome" label="Nome do produto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="produto.descricao" label="Descrição"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="produto.quantidade" label="Quantidade"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="produto.valor" label="Valor"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="v-button blue darken-1" text>Cancel</v-btn>
                <v-btn color="v-button blue darken-1" text>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- fim modal editar -->
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item = produto.id }">
        <v-icon small class="mr-2" @click.stop="dialogEditar = true">mdi-pencil</v-icon>
        <v-icon small @click="modal(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="v-button primary">Reset</v-btn>
      </template>
    </v-data-table>

    <!-- modal apagar -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Deseja apagar o produto selecionado ?</v-card-title>
        <v-card-text>Produto: {{produtoDialog.nome}}</v-card-text>
        <v-card-text>Quantidade: {{produtoDialog.quantidade}}</v-card-text>
        <v-card-text>Valor: {{produtoDialog.valor}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="v-button green darken-5" text @click="dialog = false">Calcelar</v-btn>
          <v-btn color="v-buttonn green darken-1" text @click="deleteItem(produtoDialog.id)">Apagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- fim modal apagar -->
  </section>
</template>
<script>
import Produto from "../services/produtos";

export default {
  data: () => ({
    dialogEditar: false,
    dialog: false,
    headers: [
      {
        text: "Nome do produto",
        align: "start",
        sortable: true,
        value: "nome"
      },
      { text: "Quantidade", value: "quantidade" },
      { text: "Valor", value: "valor" },
      { text: "Descrição", value: "descricao" },
      { text: "Opções", value: "action", sortable: false }
    ],
    produto: [],
    produtoDialog: [],
    search: "",
    formTitle: "Editar Produto"
  }),

  mounted() {
    this.listarProdutos();
  },

  methods: {
    listarProdutos() {
      Produto.listarProdutos()
        .then(res => {
          this.produto = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    modal(item) {
      console.log((item = item.id));
      this.dialog = true;
      Produto.produtoId(item)
        .then(res => {
          this.produtoDialog = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteItem(item) {
      this.dialog = false;
      Produto.apagarProduto(item)
        .then(() => {
          this.listarProdutos();
        })
        .catch(e => {
          console.log(e.data);
        });
    }
  }
};
</script>

<style lang="stylus" scoped></style>