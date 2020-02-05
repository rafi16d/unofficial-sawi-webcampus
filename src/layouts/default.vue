<template>
  <v-app id="app">
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <!--<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 48"><path fill="#FFE000" d="M91.676 12L76.344 35.416h6.248L97.922 12z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#1D1D1B" d="M14.895 18.362c-1.82-.826-3.81-1.132-5.8-1.132-3.843 0-7.756 1.92-7.756 6.245 0 3.157 1.956 4.117 3.913 4.632 1.954.516 3.913.584 3.913 1.957 0 .96-1.17 1.34-1.96 1.34-1.541 0-3.67-.894-4.939-1.786L0 33.975A13.655 13.655 0 0 0 7.105 36c4.083 0 8.306-1.922 8.306-6.553 0-3.26-2.2-4.636-5.116-5.219-.856-.17-2.813-.342-2.813-1.544 0-.891 1.237-1.198 1.956-1.198 1.065 0 2.404.34 3.364.855l2.093-3.98"/><g fill="#1D1D1B"><path fill-rule="evenodd" clip-rule="evenodd" d="M38.024 17.812h-6.246v1.715c-1.306-1.542-3.434-2.297-5.456-2.297-5.218 0-8.82 4.322-8.82 9.368 0 5.043 3.671 9.402 8.887 9.402 2.06 0 4.224-.791 5.321-2.538h.068v1.956h6.246V17.812m-10.056 4.84c2.54 0 4.017 1.818 4.017 3.979 0 2.232-1.476 3.947-4.017 3.947-2.54 0-4.016-1.715-4.016-3.947 0-2.161 1.477-3.98 4.016-3.98m18.565-4.839H39.6l9.198 17.606h4.049l4.358-9.644 4.358 9.644h4.05l9.197-17.606h-6.897l-4.43 9.542-4.425-9.542h-3.704l-4.428 9.542z"/><path d="M76.353 17.812h6.246v17.606h-6.246z"/></g><path fill="none" d="M0 0h98v48H0z"/></svg>-->
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Unofficial Sawi Student Portal</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'defaultLayout',
  components: {
  },
  data: () => ({
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home-variant', link: '/' },
      { title: 'Classe', icon: 'mdi-account-group-outline', link: '/classroom' },
      { title: 'Professeurs', icon: 'mdi-teach', link: '/teachers' },
      { title: 'Horaire', icon: 'mdi-calendar-month', link: '/schedule' },
      { title: 'News', icon: 'mdi-newspaper', link: '' },
      { title: 'Documents', icon: 'mdi-file-document-box-multiple', link: '/documents' },
      { title: 'Absence', icon: 'mdi-account-off', link: '' },
      { title: 'Notes', icon: 'mdi-message-draw', link: '' }
    ]
  })
}
</script>

<style>
  .v-application, body {
    background-color: #ecf0f5 !important;
  }
</style>
