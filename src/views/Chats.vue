<template>
  <div class="q-pa-md">
    <q-list
      v-for="(chat, index) in chats"
      :key="index"
    >
      <q-item
        clickable
        v-ripple
        :to="`/chat/${chat.id}`"
        class="rounded-borders"
      >
        <q-item-section avatar>
          <q-img
            :src="chat.picture"
            spinner-color="blue"
            width="50px"
            style="border-radius: 50%;"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ chat.name }}</q-item-label>
          <q-item-label caption>{{ `${chat.lastMessage.userId==$auth.sub? $t('you') : chat.lastMessage.user.displayName}: ${chat.lastMessage.content}` }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Chats',
  computed: {
    ...mapState({
      chats(state) {
        return state.chats;
      },
      token(state) {
        return state.token;
      },
    }),
  }
};
</script>
