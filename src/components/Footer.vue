<template>
  <div class="footer">
    <v-footer class="mt-5" dark>
      <v-card-text class="container">
        <strong>Todos direitos reservados - ©</strong>
        {{ new Date().getFullYear() }}
      </v-card-text>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
 flex-shrink: 0;
}
</style>