<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" width="200px" src="../assets/logo.png">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HomeLogged',
  computed: {
    userId() { return this.$auth.user.sub; },
  },
};
</script>
