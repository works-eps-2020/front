<template>
  <div class="q-pa-md">
    <div class="row justify-center q-pa-sm">
      <q-btn class="row center" label="Nouvelle organisation" color="primary" />
    </div>
    <organisationsDataTable />
  </div>
</template>

<script>
import organisationsDataTable from '../components/OrganisationsTable'

export default {
  name: 'Organizations',
  components: {
    organisationsDataTable,
  },
};
</script>
