<template>
  <q-markup-table class="q-pa-md">
    <h4>Ajouter une matière</h4>
    <div class="q-pa-md">
      <q-form @submit="createTopic" class="q-gutter-md">
        <q-input
          name="name"
          v-model="topicName"
          color="primary"
          label="Nom de la matière"
          filled
          clearable
        />
        <q-input
          name="description"
          v-model="topicDescription"
          color="primary"
          label="Description"
          filled
          clearable
        />
        <q-select filled v-model="selectedLevel" :options="levelsOptions" label="Niveau" />
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
          <th class="text-left">{{ $t("description") }}</th>
          <th class="text-left">{{ $t("level") }}</th>
          <th class="text-left">{{ $t("delete") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topic in topics" class="user" :key="topic['id']">
          <td class="text-left">{{ topic.name }}</td>
          <td class="text-left">{{ topic.description }}</td>
          <td class="text-left">{{ topic.level.name }}</td>
          <td class="text-left">
            <q-btn round color="brown-5" icon="delete" @click="deleteTopic(topic.id)" />
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
      topicName: "",
      topicDescription: "",
      submitting: false,
      selectedLevel: null
    };
  },
  mounted() {
    store.dispatch(ACTIONS.RETRIEVE_LEVELS);
    store.dispatch(ACTIONS.RETRIEVE_TOPICS);
  },
  computed: {
    ...mapState({
      topics: state => state.topics,
      levelsOptions: state =>
        state.levels.map(level => {
          return { label: level.name, value: level.id };
        })
    })
  },
  methods: {
    createTopic() {
      if (
        this.topicName.length > 0 &&
        this.topicDescription.length > 0 &&
        this.selectedLevel.value
      ) {
        this.submitting = true;
        store
          .dispatch(ACTIONS.CREATE_TOPIC, {
            name: this.topicName,
            description: this.topicDescription,
            level: {
              id: this.selectedLevel.value
            }
          })
          .then(() => {
            this.topicName = "";
            this.topicDescription = "";
            this.selectedLevel = null;
            this.submitting = false;
          });
      }
    },
    deleteTopic(id) {
      store.dispatch(ACTIONS.DELETE_TOPIC, id);
    }
  }
};
</script>
