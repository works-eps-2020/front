<template>
  <q-markup-table class="q-pa-md">
    <h4>Ajouter un niveau</h4>
    <div class="q-pa-md">
      <q-form @submit="createLevel" class="q-gutter-md">
        <q-input
          name="name"
          v-model="lessonName"
          color="primary"
          label="Nom du cours"
          filled
          clearable
        />
        <div>
          <div class="row justify-end">
            <q-btn type="submit" :loading="submitting" label="Save" class="q-mt-md" color="teal">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
    <hr />
    <h4>Existant</h4>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">{{ $t("name") }}</th>
          <th class="text-left">{{ $t("linked_topic") }}</th>
          <th class="text-left">{{ $t("delete") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="level in levels" class="user" :key="level['id']">
          <td class="text-left">{{ level.name }}</td>
          <td class="text-left">{{ level.topicCount }}</td>
          <td class="text-left">
            <q-btn round color="brown-5" icon="delete" @click="deleteLevel(level.id)" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-markup-table>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import { ACTIONS } from "@/store/actions-definitions";

export default {
  name: "Level",
  data() {
    return {
      lessonName: "",
      submitting: false
    };
  },
  mounted() {
    store.dispatch(ACTIONS.RETRIEVE_LEVELS);
  },
  computed: {
    ...mapState(["levels"])
  },
  methods: {
    createLevel() {
      this.submitting = true;
      store.dispatch(ACTIONS.CREATE_LEVEL, this.lessonName).then(() => {
        this.lessonName = "";
        this.submitting = false;
      });
    },
    deleteLevel(id) {
      store.dispatch(ACTIONS.DELETE_LEVEL, id);
    }
  }
};
</script>
