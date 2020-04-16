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
            :src="chat.users[0].user.logo_url"
            v-if="chat.users.length==1"
            spinner-color="blue"
            width="50px"
            style="border-radius: 50%;"
          />
          <q-img
            :src="chat.picture"
            v-else
            spinner-color="blue"
            width="50px"
            style="border-radius: 50%;"
          />
        </q-item-section>
        <q-item-section
          v-if="chat.users.length==1"
        >
          <q-item-label>{{ chat.users[0].user.displayname }}</q-item-label>
          <q-item-label
            caption
            v-if="chat.messages.length > 0"
          >
          {{ `${chat.messages[chat.messages.length-1].id===$auth.sub? $t('you') : chat.messages[chat.messages.length-1].user.displayname}: ${chat.messages[chat.messages.length-1].content}` }}
          </q-item-label>
        </q-item-section>
        <q-item-section
          v-else
        >
          <q-item-label>{{ chat.displayname }}</q-item-label>
          <q-item-label caption
            v-if="chat.messages.length > 0"
          >{{ `${chat.messages[chat.messages.length-1].id===$auth.sub? $t('you') : chat.messages[chat.messages.length-1].user.displayname}: ${chat.messages[chat.messages.length-1].content}` }}</q-item-label>
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
    ...mapState(['chats', 'token'])
  }
};
</script>
