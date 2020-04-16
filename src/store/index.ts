import Vue from "vue";
import Vuex from "vuex";

import { State } from "@/types/state";
import { Profile } from "@/types/profile";
import { fetchAsync, fetcher } from "@/api/fetchers";
import { MUTATIONS } from "./mutations-definitions";
import { ACTIONS } from "./actions-definitions";
import { queries } from "@/api/queries";

import { Chat } from "@/types/chat";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { Level } from "@/types/Level";
import { mutations } from "@/api/mutations";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getInstance } = require("@/auth0");

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    token: "",
    levels: []
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
    }
  },
  modules: {}
});
