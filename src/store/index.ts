import Vue from 'vue';
import Vuex from 'vuex';

import { State } from '@/types/state';
import { Profile } from '@/types/profile';
import { fetchAsync } from '@/api/fetchers';
import { MUTATIONS } from './mutations-definitions';
import { ACTIONS } from './actions-definitions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getInstance } = require("@/auth0");

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
  },
  mutations: {
    [MUTATIONS.SET_PROFILE]: (state, payload: Profile) => {
      state.profile = payload;
    },
    [MUTATIONS.SET_TOKEN]: (state, token: string) => {
      state.token = token;
    },
  },
  actions: {
    [ACTIONS.SET_PROFILE]: (context, payload: Profile) => {
      context.commit(MUTATIONS.SET_PROFILE, payload);
    },
    async [ACTIONS.SET_CHATS](context) {
      console.log(this)
      /* const chats =  await fetchAsync(
        $auth.
      )
      context.commit(MUTATIONS.SET_CHATS, chats); */
    },
    [ACTIONS.SET_TOKEN](context) {
      return new Promise((resolve, reject) => {
        const instance = getInstance();
        instance.$watch("loading", (loading: any) => {
          if (loading === false && instance.isAuthenticated) {
            instance
              .getTokenSilently()
              .then((token: any) => {
                context.commit(MUTATIONS.SET_TOKEN, token);
                resolve(token);
              })
              .catch((error: any) => {
                reject(error);
              });
          }
        });
      });
    },
  },
  modules: {
  },
});
