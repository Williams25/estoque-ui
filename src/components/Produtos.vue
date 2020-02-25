<template>
  <section class="container_p produto">
    <div class="item_produto" :key="produto.id" v-for="produto in produto">
      <h3>{{produto.nome}}</h3>
      <p>Valor R${{produto.valor}}</p>

      <v-btn color="primary" dark @click="modal(produto.id)">Detalhes</v-btn>
    </div>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Produto: {{produtoDialog.nome}}</v-card-title>
        <v-card-text>
            Descrição: {{produtoDialog.descricao}} <br>
            Quantidade: {{produtoDialog.quantidade}} <br>
            Valor: {{produtoDialog.valor}} <br>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import Produto from "../services/produtos";
export default {
  data: () => ({
    produto: [],
    produtoDialog: [],
    dialog: false
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

    modal(id) {
      this.dialog = true;
      Produto.produtoId(id)
        .then(res => {
          this.produtoDialog = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
h3 {
  font-family: "Courier New", Courier, monospace;
  color: #192a56;
  text-transform: uppercase;
}

p {
  font-family: sans-serif;
  font-size: 1rem;
  text-align: center;
  padding: 10px;
  line-height: 20px;
}
span {
  font-weight: bolder;
  color: rgb(228, 137, 19);
  text-transform: uppercase;
}
.container_p {
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
  flex-flow: row wrap;
  width: 100%;
}
.item_produto {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: auto;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  margin: 3%;
  padding: 1%;
}
.item_produto img {
  width: 100%;
  height: 90%;
  padding: 1%;
}
.item_produto:hover {
  transition: 0.4s;
  box-shadow: inset 0 0 0 gold, 0 0 2px rgba(0, 0, 0, 0.9);
}
</style>