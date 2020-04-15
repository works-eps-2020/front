import Vue from 'vue';
import Vuex from 'vuex';

import { State } from '@/types/state';
import { Profile } from '@/types/profile';
import { fetchAsync, fetcher } from '@/api/fetchers';
import { MUTATIONS } from './mutations-definitions';
import { ACTIONS } from './actions-definitions';
import { queries } from '@/api/queries';


import { Chat } from '@/types/chat';
import { Message } from '@/types/message';
import { User } from '@/types/user';


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
    [MUTATIONS.SET_CHATS]: (state, chats: Chat[]) => {
      state.chats = chats;
    }
  },
  actions: {
    [ACTIONS.SET_PROFILE]: (context, payload: Profile) => {
      context.commit(MUTATIONS.SET_PROFILE, payload);
    },
    [ACTIONS.SET_CHATS](context: any, payload: any) {
      if (context.state.token) {
        fetchAsync(context.state.token, fetcher, queries.chats, {id: payload.id})
        .then((chats) => {
          if(chats.data) {
            const chatsAvailable: Chat[] = chats.data.chat.map((chat: any) => {
              return {
                id: chat.id,
                name: chat.name,
                picture: chat.group_picture,
                lastMessage: chat.chat_messages[0],
                users: chat.chat_users,
                messages: []
              }
            });
            context.commit(MUTATIONS.SET_CHATS, chatsAvailable);
          }
        })
      }
    },
    [ACTIONS.SET_TOKEN](context) {
      return new Promise((resolve, reject) => {
        const instance = getInstance();
        instance.$watch("loading", (loading: any) => {
          if (loading === false && instance.isAuthenticated) {
            instance
              .getIdTokenClaims()
              .then((token: any) => {
                context.commit(MUTATIONS.SET_TOKEN, token.__raw);
                resolve(token.__raw);
              })
              .catch((error: any) => {
                reject(error);
              });
          }
        });
      });
    }
  },
  modules: {
  },
});
