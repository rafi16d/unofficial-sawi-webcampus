<template>
  <v-container>
    <v-layout wrap>
      <v-row>
        <v-col v-for="teacher in teachers" :key="teacher.name" cols="12" sm="3" xs="12">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line @click="openDialog(teacher)">
              <v-list-item-avatar size="80">
                <v-img :src="teacher.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1" v-text="teacher.name"></v-list-item-title>
                <v-list-item-subtitle v-for="(email, i) in teacher.emails" :key="i">{{email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="500">
        <v-card>
          <v-card-title>
            {{current.name}}
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="text-center">
            <v-avatar size="125" class="ma-5">
              <v-img :src="current.avatar" :alt="current.name" aspect-ratio="1"></v-img>
            </v-avatar>
          </div>

          <v-list two-line>

            <v-list-item v-for="(email, i) in current.emails" :key="i">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{email}}</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset v-if="current.address !== ''"></v-divider>

            <v-list-item v-if="current.address !== ''">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-subtitle>{{current.address}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Teachers',
  data: () => ({
    current: {},
    dialog: false
  }),
  computed: {
    ...mapState([
      'teachers'
    ])
  },
  methods: {
    ...mapActions([
      'getTeachers'
    ]),
    openDialog (student) {
      this.dialog = true
      this.current = student
    }
  },
  mounted () {
    this.getTeachers()
  }
}
</script>
