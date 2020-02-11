<template>
  <v-row class="pl-9 pa-5">
    <v-col cols="12">
      <h1>Hello {{ displayName }}</h1>
    </v-col>
    <v-col sm="3">
      <v-card class="mx-auto" outlined to="/schedule">
        <v-list-item two-line>
          <v-list-item-avatar tile size="50">
            <v-icon size="x-large">mdi-calendar</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="headline mb-1 font-weight-bold">Schedule</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card class="mx-auto" outlined to="/documents">
        <v-list-item two-line>
          <v-list-item-avatar tile size="50">
            <v-icon size="x-large">mdi-file-document-box-multiple</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="headline mb-1 font-weight-bold">Documents</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card class="mx-auto" outlined to="/grades">
        <v-list-item two-line>
          <v-list-item-avatar tile size="50">
            <v-icon size="x-large">mdi-message-draw</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="headline mb-1 font-weight-bold">Grades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    ...mapState(['displayName'])
  },
  methods: {}
}
</script>
