<template>
  <div>
  <q-dialog v-model="visible" transition-show="scale" transition-hide="scale">
    <q-card style="width: 700px; max-width: 80vw;">
      <div class="q-pa-md">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset" ref="organization">
          <q-select
            rounded
            filled
            v-model="model"
            multiple
            use-input
            use-chips
            option-value="id"
            option-label="displayname"
            input-debounce="0"
            :label="$t('user')"
            :options="options"
            @filter="filter"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>


          <q-input v-if="model.length > 1" v-model="url" filled type="url" :hint="$t('url_picture')" />

          <q-card-actions align="right">
            <q-btn flat :label="$t('submit')" type="submit" color="primary" v-close-popup />
            <q-btn flat :label="$t('close')" type="reset" color="primary" v-close-popup />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        icon="add"
        color="primary"
        size="xl"
        @click="visible=true"
        />
    </q-page-sticky>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import { ACTIONS } from "../store/actions-definitions";
import { fetchAsync, fetcher } from "@/api/fetchers";
import { queries } from "@/api/queries";
import { mutations } from "@/api/mutations";

export default {
  name: "FormChat",
  data() {
    return {
      model: [],
      options: [],
      visible: false,
      url: ""
    }
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    filter (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow
        update(() => {
        if (val.trim() === '') {
          this.options = []
        }
        else {
          const needle = val.toLowerCase()
          const result = fetchAsync(this.token, fetcher, queries.getUserLike, {name: `%${needle}%`});
          result.then((data) => this.options = data.data.user)
        }
      })
    },
    onSubmit() {
      const users = this.model
      if(users.filter(user => user.id == this.$auth.user.sub).length == 0)
        users.push({id: this.$auth.user.sub})
      const chatName = this.model.length > 2 ? this.model.map(user => user.displayname).join(', '): this.model[0].displayname;
      fetchAsync(this.token, fetcher, mutations.CREATE_CHAT, {name: chatName, groupPicture: this.url})
      .then((res)=>{
        console.log(res)
        if(res.data){
          users.map((user) => {
            fetchAsync(this.token, fetcher, mutations.ADD_TO_CHAT, {chatId: res.data.insert_chat.returning[0].id, userId: user.id})
            .then((res)=>{
              console.log(res)
            })
          });
        }
      })

      this.model = []
    },
    onReset() {
      this.model = []
    }
  }
};
</script>