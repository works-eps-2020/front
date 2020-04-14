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
          <q-btn stretch flat v-if="!$auth.isAuthenticated" @click="login" label='login' />
          <q-btn stretch flat v-else @click="logout" label='Déconnexion' />
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
          <q-item
            v-for="(item, index) in items"
            :key="index"
            clickable
            tag="a"
            target="_blank"
            :href="item.href"
          >
            <q-item-section avatar>
              <q-icon :name="item.avatar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
              <q-item-label caption>{{item.caption}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-if="$auth.isAuthenticated"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="$auth.user.picture"
                    spinner-color="white"
                    width="50px"
                    style="border-radius: 50%;"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                User
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <q-list>
                  <q-item
                    clickable
                    @click="logout"
                  >
                    <q-item-label>Déconnexion</q-item-label>
                  </q-item>
                <q-item
                  clickable
                  tag="a"
                  target="_blank"
                  href="/settings"
                  >
                    <q-item-label>Paramètres</q-item-label>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <Home />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Home from './views/Home.vue';

export default {
  name: 'LayoutDefault',

  components: {
    Home,
  },

  data() {
    return {
      leftDrawerOpen: false,
      items: [
        {
          label: 'docs',
          caption: 'docs',
          href: 'https://quasar.dev/',
          avatar: 'school',
        },
        {
          label: 'Github',
          caption: 'github.com/quasarframework',
          href: 'https://github.com/quasarframework/',
          avatar: 'code',
        },
        {
          label: 'docs',
          caption: 'docs',
          href: 'https://quasar.dev/',
          avatar: 'code',
        },
      ],
    };
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style>
</style>
