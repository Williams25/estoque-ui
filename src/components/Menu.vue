<template>
  <b-navbar toggleable type="dark" class="menu-color">
    <router-link to="produto" class="v-button menu-title">Gerenciamento de estoque</router-link>
    <span class="menu-subtitle mr-5">Bem vindo {{usuario.usuario}}</span>

    <b-navbar-toggle target="navbar-toggle-collapse" class="v-button">
      <template class="burguer-menu v-button"></template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link to="cadastrarProduto" class="menu_item mt-2">Cadastrar produto</router-link>
        </b-nav-item>
        <!-- <b-nav-item>
          <router-link to="cadastrarProduto" class="menu_item mt-2">Baixa de estoque</router-link>
        </b-nav-item> -->
        <b-nav-item @click="removeStorage" class="menu_item">Sair</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import Usuario from "../services/usuarios";

export default {
  data: () => ({
    id_usuario: "",
    usuario: []
  }),
  mounted() {
    this.findUsuarioId();
  },
  methods: {
    removeStorage() {
      localStorage.removeItem("usuario");
      this.$router.push("/");
    },
    findUsuarioId() {
      this.id_usuario = JSON.parse(localStorage["usuario"]);
      console.log(this.id_usuario.id);
      Usuario.findUsuarioId(this.id_usuario.id)
        .then(res => {
          this.usuario = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  cadastrarProduto() {
    this.$router.push("/cadastrarProduto");
  }
};
</script>

<style scoped>
.menu-color {
  background: #272727;
}
.v-button {
  outline: none;
  cursor: pointer;
}
.burguer-menu {
  background: url("../assets/img/menu.svg") no-repeat;
}
.menu-title {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}
.menu-subtitle {
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
}
.menu_item {
  color: #ffffffaa;
  font-weight: bold;
  font-size: 0.9rem;
  text-decoration: none;
}
.menu_item:hover {
  color: #889388;
}
</style>