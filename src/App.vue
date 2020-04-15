<template>
  <div v-if="!$auth.loading">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
            v-if="$auth.isAuthenticated"
          />

          <q-toolbar-title>
            School App
          </q-toolbar-title>
          <q-btn
            stretch
            flat
            v-if="!$auth.isAuthenticated"
            @click="login"
            :label="this.$t('login')"
          />
          <q-btn stretch flat v-else @click="logout" :label="this.$t('logout')" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-2"
        v-if="$auth.isAuthenticated"
      >
        <q-list>
          <q-item-label header>Menu</q-item-label>
          <q-item v-for="(item, index) in items" :key="index" clickable tag="a" :to="item.href">
            <q-item-section avatar>
              <q-icon :name="item.avatar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
          <div></div>
          <q-expansion-item v-if="$auth.isAuthenticated">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <q-img
                    :src="$auth.user.picture"
                    spinner-color="white"
                    width="50px"
                    style="border-radius: 50%;"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                {{ $t("firstname") }}
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <q-list>
                  <q-item clickable @click="logout">
                    <q-item-label>{{ $t("logout") }}</q-item-label>
                  </q-item>
                  <q-item clickable tag="a" target="_blank" to="/settings">
                    <q-item-label>{{ $tc("setting", 2) }}</q-item-label>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view :key="$route.fullPath" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ACTIONS } from "./store/actions-definitions";
import { getInstance } from "@/auth0";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: false,
      items: [
        {
          label: this.$t("home"),
          caption: "",
          href: "/",
          avatar: "home"
        },
        {
          label: this.$tc("chat", 1),
          caption: this.$t("send_messages"),
          href: "/messages",
          avatar: "message"
        },
        {
          label: this.$tc("level", 1),
          caption: this.$t("level_management"),
          href: "/level",
          avatar: "level"
        }
      ]
    };
  },
  mounted() {
    this[ACTIONS.SET_TOKEN]();
  },
  methods: {
    ...mapActions([ACTIONS.SET_TOKEN]),
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style></style>
