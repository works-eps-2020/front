<template>
  <div class="q-pa-md">
    <div class="row justify-center q-pa-sm">
      <q-btn class="row center" label="Nouvelle organisation" color="primary" />
    </div>
    <organisationsDataTable />
  </div>
</template>

<script>
import organisationsDataTable from '../components/organisationsTable'
export default {
  name: 'Organizations',
  components: {
    organisationsDataTable,
  },
  data() {
    return {
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
      ],
    };
  },
};
</script>
