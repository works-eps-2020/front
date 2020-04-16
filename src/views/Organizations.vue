<template>
  <div class="q-pa-md">
<<<<<<< HEAD
    <formOrganization />
=======
    <formOrganization/>
>>>>>>> add create orga
    <div class="row justify-center q-pa-sm">
      <q-btn class="row center" label="Nouvelle organisation" color="primary" @click="setShowFormOrganization(true)"/>
    </div>
    <organisationsDataTable />
  </div>
</template>

<script>
<<<<<<< HEAD
import organisationsDataTable from '@/components/OrganisationsTable.vue'
import formOrganization from '@/components/FormOrganization.vue'
=======
import organisationsDataTable from '@/components/OrganisationsTable'
import formOrganization from '@/components/FormOrganization'
>>>>>>> add create orga
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
