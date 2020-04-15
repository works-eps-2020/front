<template>
  <div class="home">
    <HomeLogin
      v-if="!$auth.isAuthenticated"
      msg="Welcome to Your Vue.js App"
    />
    <HomeLogged
      v-else
    />
  </div>
</template>

<script>
import HomeLogin from '@/components/HomeLogin.vue';
import HomeLogged from '@/components/HomeLogged.vue';

export default {
  name: 'Home',
  components: {
    HomeLogin,
    HomeLogged,
  },
};
</script>
