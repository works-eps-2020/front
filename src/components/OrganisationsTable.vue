<template>
    <q-table
      :dense="$q.screen.lt.md"
      :title="$tc('organization', 1)"
      :data="organizations"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-update="props">
        <q-td :props="props">
          <div class="q-pa-md q-gutter-sm">
            <q-btn round color='yellow' icon='create' @click="updateOrganization(props.row)"/>
            <q-btn round color='red' icon='delete' @click="removeOrganizationById(props.row.id)"/>
          </div>
        </q-td>
      </template>
  </q-table>
</template>

<script>
import store from '@/store'
import { mapState, mapActions } from 'vuex'
import { ACTIONS } from '@/store/actions-definitions'
export default {
  name: 'OrganisationDataTable',
  data() {
    return {
			columns: [
        {
          name: 'name',
          required: true,
          label: this.$t("name"),
          align: 'center',
          field:'name'
        },
        {
					name: "description", label: this.$t("description"), field: 'description',align: 'center',
        },
        {
          name: "update", label: `${this.$t('update')}/${this.$t('delete')}`,
        },
      ]
    }
	},
	computed: {
		...mapState(['organizations']),
	},
	methods: {
    ...mapActions([ACTIONS.SET_ORGANIZATIONS], [ACTIONS.REMOVE_ORGANIZATION]),
    removeOrganizationById(id){
      store.dispatch(ACTIONS.REMOVE_ORGANIZATION, {id})
    },
    updateOrganization(organization) {
      store.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, organization)
      store.dispatch(ACTIONS.SET_SHOW_FORM_ORGANIZATION, true)
    }
	},
	async mounted() {
		await this[ACTIONS.SET_ORGANIZATIONS]()
	}
}
</script>