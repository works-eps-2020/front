import Vue from 'vue';
import Vuex from 'vuex';

import {ACTIONS} from "./actions-definitions"
import {MUTATIONS} from "./mutations-definitions"
import {State} from "@/types/state"
import {Profile} from '@/types/profile'
Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
  },
  mutations: {
    [MUTATIONS.SET_PROFILE]: (state, payload: Profile) => {
      state.profile=payload
    }
  },
  actions: {
    [ACTIONS.SET_PROFILE]: (context, payload: Profile) => {
      context.commit(MUTATIONS.SET_PROFILE, payload); 
    }
  },
  modules: {
  },
});
