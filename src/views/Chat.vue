<template>
  <div
    class="q-pa-md row justify-center flex column"
  >
    <div class="q-pa-md column col justify-end">
      <div
        v-for="message in chat.messages"
        :key="message.id"
      >
        <q-chat-message
          :name="message.user.id != $auth.user.sub ? message.user.displayname: ''"
          :avatar="message.user.logo_url"
          :text="[message.content]"
          :sent="message.user.id == $auth.user.sub"
          :stamp="computeAgoText(message.created_at)"
          :bg-color="message.user.id == $auth.user.sub ? '' : 'primary'"
        />
      </div>
    </div>
    <q-footer>
      <q-toolbar
        class="q-pa-xs"
      >
        <q-input 
          v-model="text"
          :label="this.$t('send')"
          bg-color="white"
          class="full-width"
          outlined
          rounded
          @keyup.enter="insertMessage()"
        >
          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              icon="send"
              color="white"
              @click="insertMessage()"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";
import { wsSubscribe } from "@/api/webSocket";
import { subscription } from "@/api/subscription"
import { ACTIONS } from '../store/actions-definitions';

export default {
  name: 'Chat',
  data() {
    return {
      timeAgo: undefined,
      text: ''
    }
  },
  mounted() {
    TimeAgo.addLocale(fr);
    this.timeAgo = new TimeAgo("fr-FR");
  },
  computed: {
    ...mapState({
      chat(state){
        return state.chats.filter(chat => chat.id == this.$route.params.chat_id)[0]
      },
      token(state) { return state.token }
    })
  },
  methods: {
    ...mapActions([ACTIONS.ADD_MESSAGE]),
    computeAgoText: function(createdAt) {
      return this.timeAgo
        ? this.timeAgo.format(new Date(createdAt).getTime())
        : "";
    },
    handleNewMessage: function(message) {
      console.log(message)
      if (this.chat.messages.filter(msg => msg.id == message.data.chat_message[0].id).length == 0){
        console.log('coucou')
        this.chat.messages.push(message.data.chat_message[0])
      }else{
        console.log('already in')
      }
    },
    insertMessage: function() {
      this[ACTIONS.ADD_MESSAGE]({
        chatId: this.$route.params.chat_id,
        content: this.text
      })
      .then(()=> {
        this.text = ""
      }).catch(console.log)
    }
  },
  watch: {
    token (token) {
      wsSubscribe(token, subscription.SUB_MESSAGES, this.handleNewMessage, {chatId: this.$route.params.chat_id})
    }
  }
}
</script>