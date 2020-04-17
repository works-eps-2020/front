<template>
  <div class="q-pa-md">
    <h5>Vos cours</h5>
    <carrousel-lessons />
    <h5>Cours intéressants</h5>
    <carrousel-lessons />
  </div>
</template>

<script>
import CarrouselLessons from '@/components/CarrouselsLessons.vue'

export default {
  name: 'Home',
  components: {
    CarrouselLessons,
  }
};
</script>
