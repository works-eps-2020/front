<template>
  <div class="q-pa-md">
    <formOrganization />
    <div class="row justify-center q-pa-sm">
      <q-btn class="row center" label="Nouvelle organisation" color="primary" @click="setShowFormOrganization(true)"/>
    </div>
    <organisationsDataTable />
  </div>
</template>

<script>
import organisationsDataTable from '@/components/OrganisationsTable.vue'
import formOrganization from '@/components/FormOrganization.vue'
import { mapActions } from 'vuex';
import { ACTIONS } from '../store/actions-definitions';

export default {
  name: 'Organizations',
  components: {
    organisationsDataTable,
    formOrganization,
  },
  methods: {
    ...mapActions([ACTIONS.SET_SHOW_FORM_ORGANIZATION])
  }
};
</script>
