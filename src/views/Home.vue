<template>
  <div class="q-pa-md">
    <h5>Vos cours</h5>
    <carrousel-lessons :topics="topics" />
    <h5>Cours intéressants</h5>
    <carrousel-lessons :topics="topics"/>
  </div>
</template>

<script>
import CarrouselLessons from '@/components/CarrouselsLessons.vue'

export default {
  name: 'Home',
  components: {
    CarrouselLessons,
  },
  data() {
    return {
      topics: [
        {name: 'oui'},
        {name: 'oui'},
        {name: 'oui'}
      ]
    }
  }
};
</script>
