<template>
  <v-footer class="footer mt-5" dark>
    <v-card-text class="container">
      <strong>Todos direitos reservados - © {{ new Date().getFullYear() }}</strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
};
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 600px) {
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: -39px;
  }
}

@media (max-width: 600px) {
  .footer {
    position: absolute;
    width: 100%;
  }
}
</style>