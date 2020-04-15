import Vue from "vue";
import Vuex from "vuex";

import { State } from '@/types/state';
import { Profile } from '@/types/profile';
import { fetchAsync, fetcher } from '@/api/fetchers';
import { MUTATIONS } from './mutations-definitions';
import { ACTIONS } from './actions-definitions';
import { queries } from '@/api/queries';
import { mutations } from '@/api/mutations'

import { Chat } from "@/types/chat";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { Level } from "@/types/Level";
import { Organization } from '@/types/organization'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getInstance } = require("@/auth0");

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    token: "",
    levels: [],
    chats: [],
    organizations: [],
    currentOrganization: {
      id: undefined,
      description: "",
      name:""
    },
    showFormOrganization: false,
  },
  mutations: {
    [MUTATIONS.SET_PROFILE]: (state, payload: Profile) => {
      state.profile = payload;
    },
    [MUTATIONS.SET_TOKEN]: (state, token: string) => {
      state.token = token;
    },
    [MUTATIONS.MUTATE_LEVEL]: (state, levels: Level[]) => {
      state.levels = levels;
    },
    [MUTATIONS.SET_CHATS]: (state, chats: Chat[]) => {
      state.chats = chats;
    },
    [MUTATIONS.SET_ORGANIZATIONS]: (state, organizations: Organization[]) => {
      state.organizations =  organizations;
    },
    [MUTATIONS.REMOVE_ORGANIZATION]: (state, organization: Organization) => {
      state.organizations = state.organizations?.filter(item => item.id !== organization.id)
    },
    [MUTATIONS.SET_CURRENT_ORGANIZATION]: (state, organization: Organization) => {
      state.currentOrganization = {...state.currentOrganization, ...organization }
    },
    [MUTATIONS.SET_SHOW_FORM_ORGANIZATION]: (state, val: boolean) => {
      state.showFormOrganization = val
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
                setTimeout(() =>{
                  context.commit(MUTATIONS.SET_TOKEN, token.__raw);
                  resolve(token.__raw);
                }, 2000);
              })
              .catch((error: any) => {
                reject(error);
              });
            }
        });
      });
    }
  },
  modules: {}
});
