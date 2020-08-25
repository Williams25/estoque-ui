<template>
  <section class="produto">
    <app-menu />
    <div class="container mb-5">
      <app-produto />
    </div>
    <app-footer />
  </section>
</template>

<script>
export default {};
</script>

<style>
.v-button {
  outline: none;
}
.produto {
  z-index: 2;
}
</style>