<template>
  <div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
import { ACTIONS } from '@/store/actions-definitions';

store.dispatch(ACTIONS.SET_CHATS);

export default {
  name: 'Messages',
  computed: {
    ...mapState({
      chats(state) {
        return state.chats;
      },
      token(state) {
        return state.token;
      },
    }),
  },
};
</script>
