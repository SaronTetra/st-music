<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary"> </v-app-bar>
      <v-navigation-drawer app floating permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              ST-Music
            </v-list-item-title>
            <v-list-item-subtitle>
              Music theory McGuffin
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list>
          <v-list-item v-for="page in pages" :key="page" link :to="page.href">
            <v-list-item-icon>
              <v-icon color="primary">
                {{ page.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ page.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <router-view />
      </v-content>
      <v-footer>
        <v-col class="text-right" cols="12">
          Made with
          <v-icon>mdi-heart-broken</v-icon>
          by
          <a href="https://github.com/SaronTetra"> SaronTetra </a>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    pages: [
      { title: "Home", href: "/", icon: "mdi-home-outline" },
      { title: "Music", href: "/NoteRandomizer", icon: "mdi-music-note" },
      { title: "Test", href: "/test", icon: "mdi-flask" },
      { title: "About", href: "/about", icon: "mdi-account-question-outline" },
    ],
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
