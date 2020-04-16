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
        fetchAsync(context.state.token, fetcher, queries.chats, { id: payload.id }).then(chats => {
          if (chats.data) {
            const chatsAvailable: Chat[] = chats.data.chat.map((chat: any) => {
              return {
                id: chat.id,
                name: chat.name,
                picture: chat.group_picture,
                lastMessage: chat.chat_messages[0],
                users: chat.chat_users,
                messages: []
              };
            });
            context.commit(MUTATIONS.SET_CHATS, chatsAvailable);
          }
        });
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
    },
    [ACTIONS.RETRIEVE_LEVELS](context: any) {
      if (context.state.token) {
        fetchAsync(context.state.token, fetcher, queries.levels, {}).then(responsePayload => {
          if (responsePayload.data) {
            const levels: Level[] = responsePayload.data.level.map((level: any) => {
              return {
                id: level.id,
                name: level.name,
                topicCount: level.topics_aggregate.aggregate.count
              };
            });
            context.commit(MUTATIONS.MUTATE_LEVEL, levels);
          }
        });
      }
    },
    [ACTIONS.CREATE_LEVEL](context: any, name: string) {
      if (context.state.token) {
        fetchAsync(context.state.token, fetcher, mutations.CREATE_LEVEL, {
          name
        }).then(responsePayload => {
          if (responsePayload.data) {
            const newLevel = {
              id: responsePayload.data.insert_level.returning[0].id,
              name: responsePayload.data.insert_level.returning[0].name,
              topicCount: 0
            };
            context.state.levels.push(newLevel);
            context.commit(MUTATIONS.MUTATE_LEVEL, context.state.levels);
          }
        });
      }
    },
    [ACTIONS.DELETE_LEVEL](context: any, id: string) {
      if (context.state.token) {
        fetchAsync(context.state.token, fetcher, mutations.DELETE_LEVEL, {
          id
        }).then(() => {
          context.commit(
            MUTATIONS.MUTATE_LEVEL,
            context.state.levels.filter((level: Level) => level.id !== id)
          );
        });
      }
    },
    async [ACTIONS.SET_ORGANIZATIONS] (context) {
      if (context.state.token) {
        const result = await fetchAsync(context.state.token, fetcher, queries.organizations)
        if(result.data && result.data.organization){
          context.commit(MUTATIONS.SET_ORGANIZATIONS, result.data.organization);
        }
      }
    },
    async [ACTIONS.REMOVE_ORGANIZATION] (context, id: string) {
      if(context.state.token) {
        const result = await fetchAsync(context.state.token, fetcher, mutations.DELETE_ORGANIZATION, id )
        if(result.data && result.data.delete_organization.returning) {
          context.commit(MUTATIONS.REMOVE_ORGANIZATION, result.data.delete_organization.returning[0])
        }
      }
    },
    [ACTIONS.SET_CURRENT_ORGANIZATION] (context, organization: Organization) {
      context.commit(MUTATIONS.SET_CURRENT_ORGANIZATION, organization)
    },
    async [ACTIONS.CREATE_ORGANIZATION] (context) {
      if(context.state.token){
        const result = await fetchAsync(context.state.token, fetcher, mutations.CREATE_ORGANIZATION, context.state.currentOrganization)
        if(result.data && result.data.insert_organization.returning) {
          context.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, {})
          context.dispatch(ACTIONS.SET_ORGANIZATIONS)
          context.dispatch(ACTIONS.SET_SHOW_FORM_ORGANIZATION, false)
        }
      }
    },
    [ACTIONS.SET_SHOW_FORM_ORGANIZATION] (context, val) {
      context.commit(MUTATIONS.SET_SHOW_FORM_ORGANIZATION, val)
    },
    async [ACTIONS.UPDATE_ORGANIZATION] (context) {
      if(context.state.token){
        const result = await fetchAsync(context.state.token, fetcher, mutations.UPDATE_ORGANIZATION, context.state.currentOrganization)
        if(result.data && result.data.update_organization.returning) {
          context.dispatch(ACTIONS.SET_CURRENT_ORGANIZATION, {})
          context.dispatch(ACTIONS.SET_ORGANIZATIONS)
          context.dispatch(ACTIONS.SET_SHOW_FORM_ORGANIZATION, false)
        }
      }
    }
  },
  modules: {}
});
