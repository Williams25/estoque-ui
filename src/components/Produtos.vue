<template>
  <section class="produto mt-5">
    <v-data-table
      :headers="headers"
      :items="produtoArray"
      :sort-by="produtoArray"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar produto em estoque"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-5" inset vertical></v-divider>

          <v-btn class="v-button adicionar" @click="$router.push('/cadastrarProduto')"></v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item = produtoArray.id }">
        <v-icon small class="mr-2" @click="modalEditar(item)">mdi-pencil</v-icon>
        <v-icon small @click="modalApagar(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <p>Não contem items em estoque</p>
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

          <b-button variant="danger" class="ml-2 mr-2" @click="dialog = false">Cancelar</b-button>
          <b-button variant="primary" class="ml-2 mr-2" @click="deleteItem(produtoDialog.id)">Apagar</b-button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- fim modal apagar -->

    <!-- modal editar -->
    <v-row justify="center">
      <v-dialog v-model="dialogEditar" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Produto</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <input v-model="produtoDialog.id" required type="hidden" />

                <input label="id_usuario" v-model="produtoDialog.id_usuario" required type="hidden" />

                <v-col cols="12">
                  <v-text-field label="Nome Produto" v-model="produtoDialog.nome" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Descrição" v-model="produtoDialog.descricao" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Quantidade exemplo:(1, 100)"
                    v-model="produtoDialog.quantidade"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Valor exemplo:(2.99, 100.00)"
                    v-model="produtoDialog.valor"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <b-button variant="danger" class="ml-2 mr-2" @click="dialogEditar = false">Cancelar</b-button>
            <b-button variant="primary" class="ml-2 mr-2" @click="editarprod">Salvar</b-button>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- fim modal editar -->
    </v-row>

    <v-spacer></v-spacer>
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
    
  </section>
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
    dialogEditar: false,
    dialog: false,
    headers: [
      {
        text: "Nome do produto",
        align: "start",
        sortable: true,
        value: "nome"
      },
      { text: "Descrição", value: "descricao" },
      { text: "Quantidade", value: "quantidade" },
      { text: "Valor", value: "valor" },
      { text: "Opções", value: "action", sortable: false }
    ],
    produtoArray: [],
    produtoDialog: [],
    produto: {},
    search: "",
    id: "",
    id_usuario: ""
  }),

  mounted() {
    if (!this.recuperaStorage()) {
      return this.$router.push("/");
    }
    this.listarProdutos();
  },

  methods: {
    listarProdutos() {
      Produto.listarProdutos(this.id_usuario.id)
        .then(res => {
          this.produtoArray = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    modalApagar(item) {
      this.dialog = true;
      Produto.produtoId(item.id)
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
          this.text = "Produto apagado com sucesso!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(e => {
          console.log(e.data);
          this.text = "Erro ao apagar produto tente novamente!";
          this.color = "error";
          this.snackbar = true;
        });
    },

    modalEditar(value) {
      this.dialogEditar = true;
      Produto.produtoId(value.id)
        .then(res => {
          this.produtoDialog = res.data;
          console.log(value);
        })
        .catch(e => {
          console.log(e);
        });
    },

    editarprod() {
      this.produto = {
        id: this.produtoDialog.id,
        id_usuario: this.id_usuario.id,
        nome: this.produtoDialog.nome,
        descricao: this.produtoDialog.descricao,
        quantidade: this.produtoDialog.quantidade,
        valor: this.produtoDialog.valor
      };

      Produto.editarProduto(this.produto)
        .then(res => {
          this.produto = res.data;
          this.listarProdutos();
          this.text = "Produto alterado com sucesso!";
          this.color = "success";
          this.snackbar = true;
          this.dialogEditar = false;
        })
        .catch(e => {
          this.dialogEditar = false;
          console.log(e.response.data);
          this.text = "Erro ao alterar produto tente novamente!";
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

<style  scoped>
.v-button {
  outline: none;
  cursor: pointer;
}
.adicionar {
  background-image: url("../assets/img/plus.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
  border: none;
}
.produto {
  flex: 1;
  z-index: 5;
}
</style>