<template>
  <q-dialog :value='showFormOrganization' transition-show="scale" transition-hide="scale" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <div class="q-pa-md">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset" ref="organization">
          <q-input
            :value="currentOrganization.name"
            @input="updateCurrentOrganizationName"
            filled
            counter
            maxlength="255"
            :label="$t('form_organization_name_label')"
            :hint="$t('form_organization_name_hint')"
            lazy-rules
            :rules="[ val => val && val.length > 0 || $t('required') ]"
          />
          <q-input
            :value="currentOrganization.description"
            @input="updateCurrentOrganizationDescription"
            filled
            counter
            maxlength="255"
            :label="$t('form_organization_description_label')"
            :hint="$t('form_organization_description_hint')"
            type="textarea"
            lazy-rules
            :rules="[ val => val && val.length > 0 || $t('required') ]"
          />
          <div>
            <q-btn :label="$t('submit')" type="submit" color="primary" />
            <q-btn :label="$t('close')" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
import { ACTIONS } from '../store/actions-definitions'
export default {
  name: 'formOrganization',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['currentOrganization', 'showFormOrganization'])
  },
  methods: {
    updateCurrentOrganizationDescription(val) {
      store.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, {description: val})
    },
    updateCurrentOrganizationName(val) {
      store.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, {name: val})
    },
    onSubmit() {
      this.$refs.organization.validate().then(success => {
        if (success) {
          if(store.state.currentOrganization.id && store.state.currentOrganization.id.length > 0){
            console.log('ici')
            store.dispatch(ACTIONS.UPDATE_ORGANIZATION)
          }else {
            console.log('here')
            store.dispatch(ACTIONS.CREATE_ORGANIZATION)
          }
        }
      })
    },
    onReset() {
      this.$refs.organization.resetValidation()
      store.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, {})
      store.dispatch(ACTIONS.SET_SHOW_FORM_ORGANIZATION, false)
    }
  }
}
</script>